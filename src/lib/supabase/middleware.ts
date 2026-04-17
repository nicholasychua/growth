import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/dashboard");

  const hasXSession = request.cookies.has("x_user_id");

  // Fast path: public routes never need the Supabase session lookup.
  // This avoids a network round-trip to Supabase on every page load and
  // prevents blocking the homepage if Supabase is slow/unreachable.
  if (isPublicRoute) {
    return NextResponse.next();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Fast path: if Supabase isn't configured, skip the heavy import entirely.
  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("your-supabase")) {
    if (!hasXSession) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Lazy import: only pull @supabase/ssr into the middleware bundle
  // when we actually need it, keeping the Edge bundle small and cold
  // starts / dev compiles fast.
  const { createServerClient } = await import("@supabase/ssr");

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: {
          name: string;
          value: string;
          options?: Record<string, unknown>;
        }[]
      ) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !hasXSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
