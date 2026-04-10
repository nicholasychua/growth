import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function loginRedirect(request: NextRequest, errorCode: string) {
  const url = new URL("/login", request.url);
  url.searchParams.set("error", errorCode);
  return NextResponse.redirect(url);
}

function getRedirectUri(request: NextRequest): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const origin =
    process.env.NODE_ENV === "production" && siteUrl
      ? siteUrl
      : request.nextUrl.origin;

  return new URL("/auth/callback", origin).toString();
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    console.error("[X OAuth] Provider returned error:", error);
    return loginRedirect(request, "access_denied");
  }

  const storedState = request.cookies.get("x_oauth_state")?.value;
  const codeVerifier = request.cookies.get("x_code_verifier")?.value;

  if (!code || !state || !storedState || !codeVerifier) {
    console.error("[X OAuth] Missing params — code:", !!code, "state:", !!state, "storedState:", !!storedState, "codeVerifier:", !!codeVerifier);
    return loginRedirect(request, "invalid_state");
  }

  if (state !== storedState) {
    console.error("[X OAuth] State mismatch — expected:", storedState, "got:", state);
    return loginRedirect(request, "invalid_state");
  }

  const clientId = process.env.X_CLIENT_ID;
  const clientSecret = process.env.X_CLIENT_SECRET;

  if (!clientId) {
    console.error("[X OAuth] Missing X_CLIENT_ID env var");
    return loginRedirect(request, "token_failed");
  }

  const redirectUri = getRedirectUri(request);

  const tokenHeaders: HeadersInit = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  if (clientSecret) {
    tokenHeaders.Authorization = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;
  }

  const tokenRes = await fetch("https://api.twitter.com/2/oauth2/token", {
    method: "POST",
    headers: tokenHeaders,
    body: new URLSearchParams({
      client_id: clientId,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  });

  if (!tokenRes.ok) {
    const body = await tokenRes.text();
    console.error("[X OAuth] Token exchange failed:", tokenRes.status, body);
    return loginRedirect(request, "token_failed");
  }

  const tokens = await tokenRes.json();

  const userRes = await fetch(
    "https://api.twitter.com/2/users/me?user.fields=profile_image_url",
    { headers: { Authorization: `Bearer ${tokens.access_token}` } }
  );

  if (!userRes.ok) {
    const body = await userRes.text();
    console.error("[X OAuth] User fetch failed:", userRes.status, body);
    return loginRedirect(request, "user_failed");
  }

  const { data: xUser } = await userRes.json();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase.from("x_accounts").upsert(
      {
        x_user_id: xUser.id,
        username: xUser.username,
        display_name: xUser.name,
        profile_image_url: xUser.profile_image_url,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        token_expires_at: new Date(
          Date.now() + tokens.expires_in * 1000
        ).toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "x_user_id" }
    );

    if (dbError) {
      console.error("[X OAuth] DB upsert failed:", dbError.message);
    }
  }

  const response = NextResponse.redirect(new URL("/dashboard", request.url));

  const cookieOptions = {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  };

  response.cookies.set("x_user_id", xUser.id, {
    ...cookieOptions,
    httpOnly: true,
  });
  response.cookies.set("x_username", xUser.username, {
    ...cookieOptions,
    httpOnly: false,
  });
  response.cookies.set("x_display_name", xUser.name, {
    ...cookieOptions,
    httpOnly: false,
  });
  if (xUser.profile_image_url) {
    response.cookies.set("x_profile_image", xUser.profile_image_url, {
      ...cookieOptions,
      httpOnly: false,
    });
  }

  response.cookies.delete("x_code_verifier");
  response.cookies.delete("x_oauth_state");

  return response;
}
