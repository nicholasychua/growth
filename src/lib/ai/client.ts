import type {
  GenerateTweetsResponse,
  TweetAnalysis,
} from "./types";

async function postJson<T>(
  url: string,
  body: unknown,
  signal?: AbortSignal
): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });

  const text = await res.text();
  let parsed: unknown = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    // Non-JSON error body (e.g. Next.js html error page)
  }

  if (!res.ok) {
    const message =
      parsed && typeof parsed === "object" && "error" in parsed &&
        typeof (parsed as { error: unknown }).error === "string"
        ? (parsed as { error: string }).error
        : `Request failed with ${res.status}`;
    throw new Error(message);
  }

  return parsed as T;
}

export function generateTweets(
  prompt: string,
  signal?: AbortSignal
): Promise<GenerateTweetsResponse> {
  return postJson<GenerateTweetsResponse>(
    "/api/ai/generate-tweets",
    { prompt },
    signal
  );
}

export function analyzeTweet(
  tweet: string,
  author?: string,
  signal?: AbortSignal
): Promise<TweetAnalysis> {
  return postJson<TweetAnalysis>(
    "/api/ai/analyze-tweet",
    { tweet, author },
    signal
  );
}
