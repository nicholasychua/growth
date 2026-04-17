"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUp,
  Check,
  ChevronRight,
  Heart,
  Info,
  LoaderCircle,
  MessageCircle,
  PanelRightClose,
  PanelRightOpen,
  Repeat2,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { analyzeTweet, generateTweets } from "@/lib/ai/client";
import type {
  GeneratedTweet,
  TweetAnalysis,
} from "@/lib/ai/types";

interface InspirationPanelProps {
  onApplyToDraft: (text: string) => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

interface UserMessage {
  id: string;
  role: "user";
  text: string;
}

interface AssistantMessage {
  id: string;
  role: "assistant";
  intro: string;
  tweets: GeneratedTweet[];
}

interface ErrorMessage {
  id: string;
  role: "error";
  text: string;
}

type ChatMessage = UserMessage | AssistantMessage | ErrorMessage;

const examplePrompts = [
  "Lessons from shipping a side project",
  "Hot takes on AI agents",
  "Counterintuitive career advice",
  "Things early founders get wrong",
];

function shortId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 6)}`;
}

export function InspirationPanel({
  onApplyToDraft,
  collapsed,
  onToggleCollapsed,
}: InspirationPanelProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTweet, setSelectedTweet] = useState<GeneratedTweet | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const hasConversation = messages.length > 0 || isGenerating;

  // Auto-grow textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [input]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (selectedTweet) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isGenerating, selectedTweet]);

  // Abort any in-flight request when unmounting
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const submit = useCallback(
    async (promptText: string) => {
      const trimmed = promptText.trim();
      if (!trimmed || isGenerating) return;

      const userMsg: UserMessage = {
        id: shortId("u"),
        role: "user",
        text: trimmed,
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsGenerating(true);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const result = await generateTweets(trimmed, controller.signal);
        const assistantMsg: AssistantMessage = {
          id: shortId("a"),
          role: "assistant",
          intro:
            result.intro ||
            `Here are ${result.tweets.length} posts that match your direction.`,
          tweets: result.tweets,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        const errorMsg: ErrorMessage = {
          id: shortId("e"),
          role: "error",
          text:
            (err as Error).message ||
            "Something went wrong while generating posts.",
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsGenerating(false);
      }
    },
    [isGenerating]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit(input);
    }
  };

  if (collapsed) {
    return (
      <aside className="flex h-full w-[44px] shrink-0 flex-col items-center border-l border-border bg-background py-3">
        <button
          type="button"
          onClick={onToggleCollapsed}
          className="group flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-hover hover:text-foreground cursor-pointer"
          aria-label="Open inspiration panel"
          title="Open inspiration"
        >
          <PanelRightOpen className="h-4 w-4" strokeWidth={1.75} />
        </button>
        <div className="mt-3 flex flex-col items-center gap-1.5 rotate-180 [writing-mode:vertical-rl] text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground/70">
          <Sparkles className="h-3.5 w-3.5 rotate-180" strokeWidth={1.75} />
          Inspiration
        </div>
      </aside>
    );
  }

  return (
    <aside className="relative flex h-full w-[420px] shrink-0 flex-col border-l border-border bg-background">
      <PanelHeader
        title={selectedTweet ? "Tweet breakdown" : "Inspiration"}
        subtitle={
          selectedTweet
            ? "Study what made this post land"
            : "Generate and break down viral posts"
        }
        onBack={selectedTweet ? () => setSelectedTweet(null) : undefined}
        onCollapse={onToggleCollapsed}
      />

      <AnimatePresence mode="wait">
        {selectedTweet ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <TweetDetailView
              tweet={selectedTweet}
              onApplyToDraft={(text) => {
                onApplyToDraft(text);
                setSelectedTweet(null);
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div
              ref={scrollRef}
              className="flex-1 min-h-0 overflow-y-auto px-4 pt-4 pb-3"
            >
              {!hasConversation ? (
                <EmptyState
                  onPickExample={(text) => {
                    setInput(text);
                    submit(text);
                  }}
                />
              ) : (
                <MessageList
                  messages={messages}
                  isGenerating={isGenerating}
                  onSelectTweet={setSelectedTweet}
                  onUseTweet={(tweet) => onApplyToDraft(tweet.content)}
                />
              )}
            </div>

            <div className="shrink-0 border-t border-border bg-background/95 px-3 py-3 backdrop-blur">
              <ComposerInput
                value={input}
                onChange={setInput}
                onSubmit={() => submit(input)}
                onKeyDown={onKeyDown}
                textareaRef={textareaRef}
                disabled={isGenerating}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}

function PanelHeader({
  title,
  subtitle,
  onBack,
  onCollapse,
}: {
  title: string;
  subtitle: string;
  onBack?: () => void;
  onCollapse: () => void;
}) {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-border px-4 h-[52px]">
      <div className="flex min-w-0 items-center gap-2">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-hover hover:text-foreground cursor-pointer"
            aria-label="Back to chat"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
          </button>
        )}
        <div className="min-w-0">
          <h2 className="truncate text-[13px] font-semibold tracking-[-0.01em] text-foreground">
            {title}
          </h2>
          <p className="truncate text-[11.5px] text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onCollapse}
        className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-hover hover:text-foreground cursor-pointer"
        aria-label="Hide inspiration panel"
        title="Hide"
      >
        <PanelRightClose className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </header>
  );
}

function EmptyState({
  onPickExample,
}: {
  onPickExample: (prompt: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto flex h-full max-w-[360px] flex-col items-center justify-center text-center"
    >
      <div className="relative mb-5 h-14 w-14">
        <div
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.55) 0%, rgba(168,85,247,0) 70%)",
            transform: "scale(1.6)",
          }}
        />
        <div
          className="relative h-full w-full rounded-full shadow-[0_8px_24px_-8px_rgba(168,85,247,0.45)]"
          style={{
            background:
              "radial-gradient(circle at 35% 28%, #fbd4ff 0%, #e879f9 32%, #c026d3 62%, #86198f 100%)",
          }}
        />
      </div>

      <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-foreground">
        Find your next banger
      </h3>
      <p className="mt-1.5 max-w-[300px] text-[12.5px] leading-relaxed text-muted-foreground">
        Describe a topic or angle and the AI will surface high-performing posts
        you can study, steal from, and remix.
      </p>

      <div className="mt-6 w-full space-y-1.5">
        {examplePrompts.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPickExample(p)}
            className="group flex w-full items-center justify-between rounded-lg border border-border bg-white px-3 py-2 text-left text-[12.5px] text-foreground/85 transition-all hover:border-foreground/20 hover:bg-hover cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Zap
                className="h-3 w-3 text-[#a855f7]"
                strokeWidth={2}
                fill="currentColor"
              />
              {p}
            </span>
            <ChevronRight
              className="h-3.5 w-3.5 text-muted-foreground/50 transition-colors group-hover:text-foreground/60"
              strokeWidth={1.75}
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function MessageList({
  messages,
  isGenerating,
  onSelectTweet,
  onUseTweet,
}: {
  messages: ChatMessage[];
  isGenerating: boolean;
  onSelectTweet: (tweet: GeneratedTweet) => void;
  onUseTweet: (tweet: GeneratedTweet) => void;
}) {
  return (
    <div className="space-y-5">
      {messages.map((msg) => {
        if (msg.role === "user") {
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex justify-end"
            >
              <div className="max-w-[80%] rounded-2xl bg-foreground px-3.5 py-2 text-[13px] leading-relaxed text-white shadow-sm">
                {msg.text}
              </div>
            </motion.div>
          );
        }
        if (msg.role === "error") {
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-start gap-2.5"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                <Info className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              <p className="rounded-lg border border-rose-200/60 bg-rose-50/60 px-3 py-2 text-[12.5px] leading-relaxed text-rose-700">
                {msg.text}
              </p>
            </motion.div>
          );
        }
        return (
          <div key={msg.id} className="space-y-3">
            <div className="flex items-start gap-2.5">
              <MiniOrb />
              <p className="flex-1 pt-0.5 text-[12.5px] leading-relaxed text-foreground/80">
                {msg.intro}
              </p>
            </div>
            <div className="space-y-2.5 pl-8">
              {msg.tweets.map((tweet, i) => (
                <TweetCard
                  key={msg.id + tweet.id}
                  tweet={tweet}
                  index={i}
                  onClick={() => onSelectTweet(tweet)}
                  onUse={() => onUseTweet(tweet)}
                />
              ))}
            </div>
          </div>
        );
      })}

      <AnimatePresence>
        {isGenerating && (
          <motion.div
            key="generating"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 pl-0 text-[12.5px] text-muted-foreground"
          >
            <MiniOrb pulsing />
            <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
            <span>Scanning top-performing posts…</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MiniOrb({ pulsing = false }: { pulsing?: boolean }) {
  return (
    <motion.div
      animate={pulsing ? { scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] } : {}}
      transition={pulsing ? { duration: 1.4, repeat: Infinity } : {}}
      className="mt-0.5 h-5 w-5 shrink-0 rounded-full shadow-[0_3px_10px_-3px_rgba(168,85,247,0.55)]"
      style={{
        background:
          "radial-gradient(circle at 35% 28%, #fbd4ff 0%, #e879f9 32%, #c026d3 62%, #86198f 100%)",
      }}
      aria-hidden
    />
  );
}

function TweetCard({
  tweet,
  index,
  onClick,
  onUse,
}: {
  tweet: GeneratedTweet;
  index: number;
  onClick: () => void;
  onUse: () => void;
}) {
  const [used, setUsed] = useState(false);

  return (
    <motion.div
      role="button"
      tabIndex={0}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25, ease: "easeOut" }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="group relative block w-full overflow-hidden rounded-2xl border border-border/80 bg-white p-3.5 text-left shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-[1px] hover:border-foreground/15 hover:shadow-[0_6px_20px_-10px_rgba(0,0,0,0.14)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/15"
    >
      <div className="flex items-start gap-3">
        <Avatar
          seed={tweet.handle || tweet.author}
          initials={tweet.avatarInitials}
          size={36}
        />
        <div className="min-w-0 flex-1">
          {/* Header row: name + handle on left, date on right */}
          <div className="flex min-w-0 items-center gap-1.5">
            <span className="truncate text-[13px] font-semibold tracking-[-0.005em] text-foreground">
              {tweet.author}
            </span>
            <span className="truncate text-[11.5px] text-muted-foreground/80">
              {tweet.handle}
            </span>
            {tweet.date ? (
              <>
                <span className="text-muted-foreground/40">·</span>
                <span className="shrink-0 text-[11.5px] tabular-nums text-muted-foreground/70">
                  {tweet.date}
                </span>
              </>
            ) : null}
          </div>

          {/* Tweet content */}
          <p className="mt-1 whitespace-pre-line text-[13px] leading-[1.55] text-foreground/90 line-clamp-4">
            {tweet.content}
          </p>

          {/* Footer row — metrics truncate before Use button */}
          <div className="mt-3 flex items-center gap-2 pt-2.5 border-t border-border/60">
            <div className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">
              <Metric icon={<Heart className="h-3 w-3" />} value={tweet.likes} />
              <Metric
                icon={<Repeat2 className="h-3 w-3" />}
                value={tweet.retweets}
              />
              <Metric
                icon={<MessageCircle className="h-3 w-3" />}
                value={tweet.replies}
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (used) return;
                setUsed(true);
                onUse();
              }}
              disabled={used}
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border bg-white px-2.5 py-[4px] text-[11px] font-medium text-foreground transition-all hover:border-foreground/25 hover:bg-hover disabled:cursor-default disabled:opacity-60 cursor-pointer"
            >
              {used ? (
                <>
                  <Check className="h-3 w-3" /> Applied
                </>
              ) : (
                <>
                  <Sparkles className="h-3 w-3" /> Use
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Subtle breakdown affordance — icon-only, never competes for space */}
      <span
        className="pointer-events-none absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground/0 transition-all duration-200 group-hover:bg-muted/60 group-hover:text-muted-foreground/70"
        aria-hidden
        title="Open breakdown"
      >
        <ChevronRight className="h-3 w-3" strokeWidth={2.25} />
      </span>
    </motion.div>
  );
}

function Metric({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <span className="flex items-center gap-1 text-[11px] text-muted-foreground/70">
      {icon}
      {value}
    </span>
  );
}

function TweetDetailView({
  tweet,
  onApplyToDraft,
}: {
  tweet: GeneratedTweet;
  onApplyToDraft: (text: string) => void;
}) {
  const [analysis, setAnalysis] = useState<TweetAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  // Reset analysis when tweet changes
  useEffect(() => {
    setAnalysis(null);
    setError(null);
    setIsAnalyzing(false);
    setApplied(false);
    abortRef.current?.abort();
  }, [tweet.id]);

  const runAnalysis = useCallback(async () => {
    if (isAnalyzing || analysis) return;
    setError(null);
    setIsAnalyzing(true);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const result = await analyzeTweet(
        tweet.content,
        tweet.author,
        controller.signal
      );
      setAnalysis(result);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError((err as Error).message || "Analysis failed. Try again.");
    } finally {
      setIsAnalyzing(false);
    }
  }, [analysis, isAnalyzing, tweet.author, tweet.content, tweet.id]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 min-h-0 overflow-y-auto px-4 pt-4 pb-6">
        {/* Tweet preview card */}
        <div className="rounded-xl border border-border bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <div className="flex items-start gap-2.5">
            <Avatar
              seed={tweet.handle || tweet.author}
              initials={tweet.avatarInitials}
              size={40}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-[13px] font-semibold text-foreground">
                  {tweet.author}
                </span>
                <span className="truncate text-[12px] text-muted-foreground">
                  {tweet.handle}
                </span>
              </div>
              <p className="mt-1.5 whitespace-pre-line text-[13.5px] leading-[1.55] text-foreground">
                {tweet.content}
              </p>
              <div className="mt-3 flex items-center gap-4 border-t border-border/70 pt-2.5">
                <Metric icon={<Heart className="h-3 w-3" />} value={tweet.likes} />
                <Metric
                  icon={<Repeat2 className="h-3 w-3" />}
                  value={tweet.retweets}
                />
                <Metric
                  icon={<MessageCircle className="h-3 w-3" />}
                  value={tweet.replies}
                />
                <span className="ml-auto tabular-nums text-[11px] text-muted-foreground/70">
                  {tweet.date}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={runAnalysis}
            disabled={isAnalyzing || !!analysis}
            className={cn(
              "inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[12.5px] font-medium transition-all cursor-pointer",
              analysis
                ? "bg-muted text-foreground/70"
                : "bg-foreground text-white hover:bg-foreground/85",
              (isAnalyzing || analysis) && "cursor-default disabled:opacity-90"
            )}
          >
            {isAnalyzing ? (
              <>
                <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                Analyzing…
              </>
            ) : analysis ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Analyzed
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                Analyze why it went viral
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              if (applied) return;
              setApplied(true);
              onApplyToDraft(tweet.content);
            }}
            disabled={applied}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-[12.5px] font-medium text-foreground transition-all hover:border-foreground/25 hover:bg-hover disabled:cursor-default disabled:opacity-60 cursor-pointer"
          >
            {applied ? (
              <>
                <Check className="h-3.5 w-3.5" /> Applied
              </>
            ) : (
              "Use in draft"
            )}
          </button>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3 rounded-lg border border-rose-200/60 bg-rose-50/70 px-3 py-2 text-[12px] text-rose-700"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analysis */}
        <AnimatePresence>
          {analysis && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5"
            >
              <AnalysisView analysis={analysis} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function AnalysisView({ analysis }: { analysis: TweetAnalysis }) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/80">
          <Sparkles
            className="h-3 w-3 text-[#a855f7]"
            strokeWidth={2}
            fill="currentColor"
          />
          Why it worked
        </div>
        <p className="mt-1.5 text-[13.5px] font-medium leading-snug tracking-[-0.01em] text-foreground">
          {analysis.headline}
        </p>
      </div>

      <div className="space-y-2.5">
        {analysis.sections.map((section, i) => (
          <motion.div
            key={section.title + i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.25 }}
            className="rounded-lg border border-border bg-white p-3"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#a855f7]/10 text-[10px] font-semibold text-[#a855f7]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="text-[12.5px] font-semibold tracking-[-0.005em] text-foreground">
                {section.title}
              </h4>
            </div>
            <p className="mt-1.5 text-[12.5px] leading-[1.55] text-foreground/80">
              {section.summary}
            </p>
            {section.quote && (
              <blockquote className="mt-2 border-l-2 border-[#a855f7]/40 pl-2.5 text-[12px] italic leading-snug text-muted-foreground">
                &ldquo;{section.quote}&rdquo;
              </blockquote>
            )}
          </motion.div>
        ))}
      </div>

      {analysis.takeaways.length > 0 && (
        <div className="rounded-lg border border-border bg-muted/40 p-3">
          <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/80">
            <Zap
              className="h-3 w-3 text-amber-500"
              strokeWidth={2}
              fill="currentColor"
            />
            Steal this
          </div>
          <ul className="mt-2 space-y-1.5">
            {analysis.takeaways.map((t, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[12.5px] leading-relaxed text-foreground/85"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ComposerInput({
  value,
  onChange,
  onSubmit,
  onKeyDown,
  textareaRef,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  disabled: boolean;
}) {
  const canSend = useMemo(() => value.trim().length > 0 && !disabled, [
    value,
    disabled,
  ]);

  return (
    <div className="group flex items-end gap-2 rounded-xl border border-border bg-white px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all focus-within:border-foreground/25 focus-within:shadow-[0_4px_14px_rgba(0,0,0,0.05)]">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Ask for viral posts about..."
        rows={1}
        disabled={disabled}
        className="flex-1 resize-none bg-transparent py-1 text-[13px] leading-relaxed text-foreground placeholder:text-muted-foreground/55 focus:outline-none disabled:opacity-60"
        style={{ maxHeight: 160 }}
      />
      <button
        type="button"
        onClick={onSubmit}
        disabled={!canSend}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-foreground text-white transition-all hover:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
        aria-label="Generate"
      >
        <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.25} />
      </button>
    </div>
  );
}

function Avatar({
  seed,
  initials,
  size = 36,
}: {
  seed?: string;
  initials: string;
  size?: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const resolvedSeed = (seed || initials).trim() || "avatar";

  const { gradient, url } = useMemo(() => {
    // Deterministic gradient based on seed — used as a background wash behind
    // the avatar and as the fallback when the image fails to load.
    const palettes = [
      ["#fb923c", "#e11d48"],
      ["#6366f1", "#7c3aed"],
      ["#14b8a6", "#059669"],
      ["#38bdf8", "#0369a1"],
      ["#f59e0b", "#b45309"],
      ["#ec4899", "#9d174d"],
      ["#84cc16", "#3f6212"],
      ["#64748b", "#1e3a8a"],
    ];
    let hash = 0;
    for (let i = 0; i < resolvedSeed.length; i++) {
      hash = (hash * 31 + resolvedSeed.charCodeAt(i)) >>> 0;
    }
    const p = palettes[hash % palettes.length];

    // Rotate through a curated mix of DiceBear "people" styles so each author
    // feels like a distinct person rather than a uniform set. All SVGs are
    // tiny and browser-cached per (style, seed) URL.
    const styles = [
      "personas",
      "avataaars",
      "lorelei",
      "micah",
      "notionists",
      "open-peeps",
      "adventurer",
      "big-smile",
    ];
    const style = styles[hash % styles.length];

    const encoded = encodeURIComponent(resolvedSeed.replace(/^@/, ""));
    const src =
      `https://api.dicebear.com/9.x/${style}/svg?seed=${encoded}` +
      `&radius=50` +
      `&backgroundType=gradientLinear` +
      `&backgroundColor=eef2ff,f0fdfa,fef3c7,ffe4e6,ecfccb,e0f2fe,fae8ff,ffedd5`;

    return {
      gradient: `linear-gradient(135deg, ${p[0]} 0%, ${p[1]} 100%)`,
      url: src,
    };
  }, [resolvedSeed]);

  const fontSize = Math.max(10, Math.round(size * 0.34));

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full ring-1 ring-black/[0.04]"
      style={{
        width: size,
        height: size,
        background: gradient,
        boxShadow:
          "inset 0 0 0 0.5px rgba(255,255,255,0.22), 0 1px 2px rgba(0,0,0,0.06)",
      }}
      aria-hidden
    >
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt=""
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-200",
            loaded ? "opacity-100" : "opacity-0"
          )}
        />
      ) : null}

      {/* Initials underlay — shown until the image loads or if it fails */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center font-semibold text-white transition-opacity duration-200",
          loaded && !failed ? "opacity-0" : "opacity-100"
        )}
        style={{
          fontSize,
          letterSpacing: "0.02em",
          textShadow: "0 1px 2px rgba(0,0,0,0.2)",
        }}
      >
        {initials}
      </div>
    </div>
  );
}
