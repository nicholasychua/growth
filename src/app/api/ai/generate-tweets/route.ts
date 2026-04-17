import { NextResponse } from "next/server";
import {
  chatCompletion,
  OpenAIConfigError,
  OpenAIRequestError,
  safeJsonParse,
} from "@/lib/ai/openai";
import type { GenerateTweetsResponse, GeneratedTweet } from "@/lib/ai/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ModelTweet {
  author?: string;
  handle?: string;
  content?: string;
  likes?: string | number;
  retweets?: string | number;
  replies?: string | number;
  date?: string;
  context?: string;
}

interface ModelResponse {
  intro?: string;
  tweets?: ModelTweet[];
}

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "AI";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function toMetricString(value: string | number | undefined, fallback: string) {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value === "number") {
    if (value >= 1000) return (value / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return String(value);
  }
  return String(value);
}

function normalizeTweet(raw: ModelTweet): GeneratedTweet {
  const author = (raw.author || "Anonymous").toString().slice(0, 48);
  const handleRaw = (raw.handle || author.replace(/\s+/g, "").toLowerCase()).toString();
  const handle = handleRaw.startsWith("@") ? handleRaw : `@${handleRaw}`;
  return {
    id: makeId(),
    author,
    handle: handle.slice(0, 24),
    avatarInitials: initialsFromName(author),
    content: (raw.content || "").toString().slice(0, 600).trim(),
    likes: toMetricString(raw.likes, "2.4K"),
    retweets: toMetricString(raw.retweets, "410"),
    replies: toMetricString(raw.replies, "120"),
    date: (raw.date || new Date().toISOString().slice(0, 10)).toString(),
    context: raw.context ? String(raw.context).slice(0, 280) : undefined,
  };
}

export async function POST(req: Request) {
  let prompt: string;
  try {
    const body = (await req.json()) as { prompt?: unknown };
    prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
  }
  if (prompt.length > 2000) {
    return NextResponse.json({ error: "Prompt too long." }, { status: 400 });
  }

  const system = `You are a viral-tweet researcher. The user will describe a topic, voice, or direction they want to write about on X (Twitter).

Return exactly 5 FICTIONAL but highly realistic, high-performing tweets that match the user's prompt. Each tweet should feel like it could have gone viral: strong hook, punchy line-breaks where useful, no hashtags unless idiomatic, 140–280 characters of body copy.

Authors and handles should feel plausible but must NOT use real famous people's names. Invent credible-sounding writers, operators, researchers, etc. Vary the tones so the user has several directions to pull from.

Respond ONLY with valid JSON in this exact shape:
{
  "intro": "one short sentence (<=120 chars) summarizing the angle",
  "tweets": [
    {
      "author": "Full Name",
      "handle": "@handle",
      "content": "The tweet text. Use \\n for line breaks.",
      "likes": "3.2K",
      "retweets": "480",
      "replies": "210",
      "date": "YYYY/MM/DD",
      "context": "one-line note about why it lands (<=140 chars)"
    }
  ]
}`;

  try {
    const raw = await chatCompletion({
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      temperature: 0.9,
      maxTokens: 1400,
      responseFormat: { type: "json_object" },
    });

    const parsed = safeJsonParse<ModelResponse>(raw);
    if (!parsed || !Array.isArray(parsed.tweets)) {
      return NextResponse.json(
        { error: "AI returned an unexpected format. Try again." },
        { status: 502 }
      );
    }

    const tweets = parsed.tweets
      .filter((t): t is ModelTweet => !!t && typeof t === "object")
      .slice(0, 6)
      .map(normalizeTweet)
      .filter((t) => t.content.length > 0);

    if (tweets.length === 0) {
      return NextResponse.json(
        { error: "No usable tweets generated. Try a different prompt." },
        { status: 502 }
      );
    }

    const response: GenerateTweetsResponse = {
      tweets,
      intro:
        typeof parsed.intro === "string" && parsed.intro.trim().length > 0
          ? parsed.intro.trim().slice(0, 200)
          : `Here are ${tweets.length} posts that match your direction.`,
    };

    return NextResponse.json(response);
  } catch (err) {
    if (err instanceof OpenAIConfigError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    if (err instanceof OpenAIRequestError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    const message = err instanceof Error ? err.message : "Unknown error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
