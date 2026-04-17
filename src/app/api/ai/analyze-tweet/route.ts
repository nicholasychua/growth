import { NextResponse } from "next/server";
import {
  chatCompletion,
  OpenAIConfigError,
  OpenAIRequestError,
  safeJsonParse,
} from "@/lib/ai/openai";
import type { TweetAnalysis, TweetAnalysisSection } from "@/lib/ai/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ModelSection {
  title?: string;
  summary?: string;
  quote?: string;
}

interface ModelAnalysis {
  headline?: string;
  sections?: ModelSection[];
  takeaways?: string[];
}

function normalizeSection(s: ModelSection): TweetAnalysisSection | null {
  const title = (s.title || "").toString().trim();
  const summary = (s.summary || "").toString().trim();
  if (!title || !summary) return null;
  return {
    title: title.slice(0, 80),
    summary: summary.slice(0, 600),
    quote: s.quote ? s.quote.toString().slice(0, 240) : undefined,
  };
}

export async function POST(req: Request) {
  let tweet: string;
  let author: string | undefined;
  try {
    const body = (await req.json()) as { tweet?: unknown; author?: unknown };
    tweet = typeof body.tweet === "string" ? body.tweet.trim() : "";
    author = typeof body.author === "string" ? body.author.trim() : undefined;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!tweet) {
    return NextResponse.json({ error: "Tweet text is required." }, { status: 400 });
  }
  if (tweet.length > 2000) {
    return NextResponse.json({ error: "Tweet too long to analyze." }, { status: 400 });
  }

  const system = `You are a top-tier social-media analyst. You break down why short-form posts on X (Twitter) went viral.

Analyze the provided tweet and return a structured breakdown with 4–6 well-named sections. Typical sections include (pick the ones that actually apply): "The Hook", "Structure & Pacing", "Emotional Trigger", "Cognitive Pattern", "Voice & Tone", "Social Proof", "Payoff / Takeaway". Do not force sections that don't apply.

For each section:
- title: 2–5 words, specific.
- summary: 1–3 sentences. Be concrete — reference the exact moves the author made. Avoid generic advice.
- quote: (optional) the short excerpt from the tweet being discussed. Keep it under 200 characters.

Also produce:
- headline: one sentence (<=140 chars) capturing the single biggest reason this tweet works.
- takeaways: 3 bullet-style strings, each <=120 chars, that the reader can steal for their own writing.

Respond ONLY with valid JSON in this shape:
{
  "headline": "...",
  "sections": [
    { "title": "...", "summary": "...", "quote": "..." }
  ],
  "takeaways": ["...", "...", "..."]
}`;

  const userMsg = author
    ? `Tweet by ${author}:\n\n${tweet}`
    : `Tweet:\n\n${tweet}`;

  try {
    const raw = await chatCompletion({
      messages: [
        { role: "system", content: system },
        { role: "user", content: userMsg },
      ],
      temperature: 0.5,
      maxTokens: 1200,
      responseFormat: { type: "json_object" },
    });

    const parsed = safeJsonParse<ModelAnalysis>(raw);
    if (!parsed) {
      return NextResponse.json(
        { error: "AI returned an unexpected format. Try again." },
        { status: 502 }
      );
    }

    const sections = (parsed.sections || [])
      .map(normalizeSection)
      .filter((s): s is TweetAnalysisSection => s !== null)
      .slice(0, 6);

    if (sections.length === 0) {
      return NextResponse.json(
        { error: "AI did not return any analysis sections. Try again." },
        { status: 502 }
      );
    }

    const takeaways = Array.isArray(parsed.takeaways)
      ? parsed.takeaways
          .filter((t): t is string => typeof t === "string" && t.trim().length > 0)
          .map((t) => t.trim().slice(0, 200))
          .slice(0, 5)
      : [];

    const analysis: TweetAnalysis = {
      headline:
        typeof parsed.headline === "string" && parsed.headline.trim().length > 0
          ? parsed.headline.trim().slice(0, 200)
          : "Here's why this post works.",
      sections,
      takeaways,
    };

    return NextResponse.json(analysis);
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
