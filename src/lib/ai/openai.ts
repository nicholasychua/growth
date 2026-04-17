// This module should only be imported from server-side code (route handlers,
// server components). It reads OPENAI_API_KEY which must never be shipped to
// the client.

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

export class OpenAIConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OpenAIConfigError";
  }
}

export class OpenAIRequestError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "OpenAIRequestError";
    this.status = status;
  }
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatCompletionOptions {
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
  responseFormat?: { type: "json_object" } | { type: "text" };
}

export function getOpenAIConfig() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
  if (!apiKey) {
    throw new OpenAIConfigError(
      "Missing OPENAI_API_KEY. Add it to .env.local and restart the dev server."
    );
  }
  return { apiKey, model };
}

export async function chatCompletion({
  messages,
  temperature = 0.8,
  maxTokens = 1200,
  responseFormat = { type: "json_object" },
}: ChatCompletionOptions): Promise<string> {
  const { apiKey, model } = getOpenAIConfig();

  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      response_format: responseFormat,
    }),
    // Avoid caching — these requests are dynamic.
    cache: "no-store",
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new OpenAIRequestError(
      `OpenAI request failed (${res.status}): ${errText.slice(0, 400) || res.statusText}`,
      res.status
    );
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new OpenAIRequestError("OpenAI response was empty.", 502);
  }
  return content;
}

export function safeJsonParse<T>(text: string): T | null {
  try {
    return JSON.parse(text) as T;
  } catch {
    // Sometimes the model wraps JSON in ```json fences even in JSON mode.
    const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fenced) {
      try {
        return JSON.parse(fenced[1]) as T;
      } catch {
        return null;
      }
    }
    return null;
  }
}
