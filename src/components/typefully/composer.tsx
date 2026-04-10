"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoreHorizontal,
  Clock,
  Bell,
  Share2,
  ExternalLink,
  Settings,
  Lightbulb,
  Smile,
  MessageCircle,
  List,
  Quote,
  Heart,
  Repeat2,
  Maximize2,
  Image,
  Gift,
  X,
  Keyboard,
  MonitorPlay,
  Tag,
  Eye,
  LoaderCircle,
  Sparkles,
  Bookmark,
} from "lucide-react";
import type { Draft } from "@/types";
import { XFeedPreview } from "./x-preview";

function XLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function VerifiedBadge({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 22 22" fill="#1d9bf0">
      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.144.271.587.702 1.087 1.24 1.44s1.167.551 1.813.568c.647-.017 1.277-.213 1.817-.567s.972-.854 1.245-1.44c.604.223 1.26.27 1.894.14.636-.132 1.22-.437 1.69-.884.445-.47.75-1.055.88-1.69.131-.634.084-1.29-.139-1.896.587-.273 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
    </svg>
  );
}

interface ComposerProps {
  draft: Draft | null;
  onUpdateContent: (content: string) => void;
}

interface InspoTweet {
  author: string;
  handle: string;
  avatar: string;
  content: string;
  likes: string;
  retweets: string;
  time: string;
}

const headerActions = [Bell, Share2, ExternalLink, Settings];

const composerActions = [
  { icon: <div className="h-[18px] w-[18px] rounded-full border-[1.5px] border-current" />, label: "Record" },
  { icon: <List className="h-[17px] w-[17px]" strokeWidth={1.75} />, label: "Thread" },
  { icon: <Image className="h-[17px] w-[17px]" strokeWidth={1.75} />, label: "Media" },
  { icon: <Gift className="h-[17px] w-[17px]" strokeWidth={1.75} />, label: "Tag" },
  { icon: <MoreHorizontal className="h-[17px] w-[17px]" strokeWidth={1.75} />, label: "More" },
];

const bottomToolbarIcons = [Lightbulb, Smile, MessageCircle, List, Quote, Heart, Repeat2, Maximize2];

const loadingMessages = [
  "Scanning your bookmarks...",
  "Finding structurally similar posts...",
  "Analyzing top-performing hooks...",
  "Curating the best inspiration...",
];

const inspoTweets: Record<"tweet" | "article", InspoTweet[]> = {
  tweet: [
    {
      author: "Sahil Bloom",
      handle: "@SahilBloom",
      avatar: "SB",
      content: "The most underrated skill in business:\n\nClarity of thought.\n\nIf you can't explain your idea simply, you don't understand it well enough.\n\nSimple beats complex. Every time.",
      likes: "4.2K",
      retweets: "812",
      time: "2h",
    },
    {
      author: "Alex Hormozi",
      handle: "@AlexHormozi",
      avatar: "AH",
      content: "Stop trying to find your \"passion.\"\n\nGet good at something valuable.\nPassion follows mastery.\n\nNo one is passionate about things they suck at.",
      likes: "12.1K",
      retweets: "2.3K",
      time: "5h",
    },
    {
      author: "Lenny Rachitsky",
      handle: "@lennysan",
      avatar: "LR",
      content: "After talking to 100+ PMs, here's what separates great product managers:\n\n1. They say no 10x more than yes\n2. They write before they build\n3. They talk to users weekly, not monthly\n4. They ship fast, then iterate\n5. They measure what matters, not what's easy",
      likes: "3.8K",
      retweets: "645",
      time: "8h",
    },
    {
      author: "Julie Zhuo",
      handle: "@joulee",
      avatar: "JZ",
      content: "Hot take: most \"strategy\" decks are actually just a list of things a team wants to do.\n\nReal strategy is choosing what NOT to do.\n\nIf your strategy doesn't make at least one stakeholder uncomfortable, it's not a strategy.",
      likes: "2.1K",
      retweets: "389",
      time: "12h",
    },
    {
      author: "Dickie Bush",
      handle: "@dickiebush",
      avatar: "DB",
      content: "Writing online is a cheat code:\n\n• Write 1 tweet → test an idea in 30 seconds\n• Get traction → turn it into a thread\n• Thread works → turn it into a newsletter\n• Newsletter hits → turn it into a course\n\nStart small. Repurpose what works.",
      likes: "6.5K",
      retweets: "1.4K",
      time: "1d",
    },
  ],
  article: [
    {
      author: "Paul Graham",
      handle: "@paulg",
      avatar: "PG",
      content: "The best essays start with a question the writer genuinely wants to answer. Not a thesis to defend. Not a point to prove. A real question.\n\nThat's why the best writing feels like thinking out loud — because it is.",
      likes: "8.3K",
      retweets: "1.9K",
      time: "3h",
    },
    {
      author: "Morgan Housel",
      handle: "@morganhousel",
      avatar: "MH",
      content: "Every good article does the same thing:\n\nIt takes something the reader already believes and shows them a version of it they've never considered.\n\nYou're not teaching. You're reframing.",
      likes: "5.7K",
      retweets: "980",
      time: "6h",
    },
    {
      author: "Tim Urban",
      handle: "@waitbutwhy",
      avatar: "TU",
      content: "Long-form content isn't dying. Boring long-form content is dying.\n\nPeople will read 10,000 words if every paragraph earns the next one. The bar isn't length — it's whether the reader keeps wanting to scroll.",
      likes: "4.1K",
      retweets: "720",
      time: "10h",
    },
    {
      author: "Packy McCormick",
      handle: "@pacaborsky",
      avatar: "PM",
      content: "The secret to great business writing: make the reader feel smart, not you.\n\nEvery sentence should give them a lens they can reuse. An analogy they'll steal. A framing they'll bring to their next meeting.",
      likes: "2.9K",
      retweets: "510",
      time: "1d",
    },
    {
      author: "Lenny Rachitsky",
      handle: "@lennysan",
      avatar: "LR",
      content: "What I've learned writing 200+ newsletter issues:\n\nThe ones that perform best always have one thing in common — they answer a question people Google but never find a satisfying answer to.\n\nFind those gaps. Fill them better than anyone.",
      likes: "3.4K",
      retweets: "612",
      time: "2d",
    },
  ],
};

const avatarColors: Record<string, string> = {
  SB: "from-amber-400 to-orange-500",
  AH: "from-red-500 to-rose-600",
  LR: "from-violet-400 to-purple-600",
  JZ: "from-teal-400 to-cyan-600",
  DB: "from-emerald-400 to-green-600",
  PG: "from-slate-500 to-slate-700",
  MH: "from-blue-400 to-indigo-600",
  TU: "from-pink-400 to-rose-500",
  PM: "from-sky-400 to-blue-600",
};

const tips = [
  {
    icon: Keyboard,
    text: (
      <>
        Press{" "}
        <kbd className="mx-0.5 rounded-[4px] bg-muted px-1.5 py-[1px] text-[11px] font-mono font-medium border border-border">
          ⌘
        </kbd>{" "}
        or{" "}
        <kbd className="mx-0.5 rounded-[4px] bg-muted px-1.5 py-[1px] text-[11px] font-mono font-medium border border-border">
          →
        </kbd>{" "}
        or add 2 empty lines to continue your thread
      </>
    ),
  },
  {
    icon: MonitorPlay,
    text: "Drop videos, images & GIFs in the editor",
  },
  {
    icon: Tag,
    text: (
      <>
        Tag your drafts by clicking the{" "}
        <span className="inline-flex align-text-bottom">
          <Tag className="h-3.5 w-3.5" />
        </span>{" "}
        button in the top right corner
      </>
    ),
  },
  {
    icon: Share2,
    text: (
      <>
        Share your drafts to get feedback{" "}
        <span className="text-primary font-medium cursor-pointer hover:underline">
          Try it now
        </span>
      </>
    ),
  },
];

function InspoPanel({
  contentType,
  onClose,
}: {
  contentType: "tweet" | "article";
  onClose: () => void;
}) {
  const tweets = inspoTweets[contentType];

  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed top-0 left-0 z-50 flex h-full w-[420px] flex-col border-r border-border bg-white shadow-[8px_0_30px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f0f4ff]">
            <Sparkles className="h-4 w-4 text-[#2563eb]" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-[#101828]">
              Inspiration
            </h3>
            <p className="text-[11px] text-muted-foreground capitalize">
              {contentType === "tweet" ? "Top tweets" : "Article intros"} to spark ideas
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-muted-foreground/60 hover:bg-[#f4f5f7] hover:text-muted-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {tweets.map((tweet, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
              className="group rounded-xl border border-border bg-white p-4 transition-colors hover:border-[#c7d7fe] hover:bg-[#fafbff] cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`h-9 w-9 shrink-0 rounded-full bg-gradient-to-br ${avatarColors[tweet.avatar] ?? "from-gray-400 to-gray-600"} flex items-center justify-center text-white text-[11px] font-semibold`}
                >
                  {tweet.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-semibold text-[#101828] truncate">
                      {tweet.author}
                    </span>
                    <span className="text-[12px] text-muted-foreground truncate">
                      {tweet.handle}
                    </span>
                    <span className="text-[12px] text-muted-foreground/50">
                      · {tweet.time}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-[1.6] text-[#344054] whitespace-pre-line">
                    {tweet.content}
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
                      <Heart className="h-3 w-3" />
                      {tweet.likes}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground/60">
                      <Repeat2 className="h-3 w-3" />
                      {tweet.retweets}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground/60 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="h-3 w-3" />
                      Save
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Composer({ draft, onUpdateContent }: ComposerProps) {
  const [showTips, setShowTips] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [contentType, setContentType] = useState<"tweet" | "article" | null>(null);
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [showInspoPanel, setShowInspoPanel] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.max(el.scrollHeight, 200) + "px";
    }
  }, [draft?.content]);

  useEffect(() => {
    if (draft && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [draft?.id]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onUpdateContent(e.target.value);
    },
    [onUpdateContent]
  );

  useEffect(() => {
    if (!isLoading) return;

    const interval = window.setInterval(() => {
      setLoadingIndex((current) => (current + 1) % loadingMessages.length);
    }, 750);

    return () => window.clearInterval(interval);
  }, [isLoading]);

  const handleInspo = useCallback(() => {
    if (!contentType || !topic.trim() || isLoading) return;

    setLoadingIndex(0);
    setIsLoading(true);
    setShowInspoPanel(false);

    window.setTimeout(() => {
      setIsLoading(false);
      setShowInspoPanel(true);
    }, 3000);
  }, [contentType, topic, isLoading]);

  const hasGeneratedDraft = Boolean(draft?.content?.trim());

  return (
    <div className="flex flex-1 flex-col bg-background min-w-0">
      {/* Header Bar */}
      <header className="flex items-center justify-between border-b border-border px-5 h-[52px] shrink-0">
        <div className="flex items-center gap-2">
          <XLogo className="h-[18px] w-[18px]" />
          <button className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-hover transition-colors cursor-pointer">
            <MoreHorizontal className="h-[18px] w-[18px]" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <button className="inline-flex items-center gap-1.5 rounded-l-full border border-primary/25 bg-primary/[0.04] pl-3.5 pr-3 py-[7px] text-[13px] font-mono font-medium text-primary hover:bg-primary/[0.08] transition-colors cursor-pointer">
              <Clock className="h-3.5 w-3.5" />
              Schedule
            </button>
            <button className="inline-flex items-center rounded-r-full border border-l-0 border-primary/25 bg-primary/[0.04] px-2 py-[7px] text-primary hover:bg-primary/[0.08] transition-colors cursor-pointer">
              <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 5l3 3 3-3" />
              </svg>
            </button>
          </div>

          <button className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-[7px] text-[13px] font-mono font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer shadow-sm shadow-primary/20">
            Publish
          </button>

          <button
            onClick={() => setShowPreview(true)}
            disabled={!hasGeneratedDraft}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-[7px] text-[13px] font-mono font-medium text-foreground hover:bg-hover transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>

          <div className="ml-1 flex items-center gap-0.5">
            {headerActions.map((Icon, i) => (
              <button
                key={i}
                className="rounded-md p-1.5 text-muted-foreground/60 hover:text-muted-foreground hover:bg-hover transition-colors cursor-pointer"
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </button>
            ))}
            <div className="ml-1 h-7 w-7 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-[10px] font-semibold cursor-pointer hover:opacity-90 transition-opacity">
              N
            </div>
          </div>
        </div>
      </header>

      {/* Scrollable Editor Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[640px] px-8 pt-8 pb-16">
          {/* User Identity */}
          <div className="flex items-center gap-3 mb-1">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
              NC
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[15px] font-semibold tracking-[-0.01em]">
                Nicholas Chua
              </span>
              <VerifiedBadge className="h-[18px] w-[18px]" />
              <span className="text-[15px] text-muted-foreground ml-0.5">
                @nicholasychua
              </span>
            </div>
          </div>

          {/* Composer Action Icons */}
          <div className="flex items-center gap-0.5 ml-14 mb-5">
            {composerActions.map(({ icon, label }) => (
              <button
                key={label}
                className="rounded-md p-1.5 text-muted-foreground/40 hover:text-muted-foreground/70 hover:bg-hover transition-colors cursor-pointer"
                title={label}
              >
                {icon}
              </button>
            ))}
          </div>

          {/* Tips Card */}
          <AnimatePresence>
            {showTips && !isLoading && !showInspoPanel && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="mb-8 rounded-xl border border-border p-5"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-[14px] font-semibold tracking-[-0.01em]">
                    Tips to get started
                  </h3>
                  <button
                    onClick={() => setShowTips(false)}
                    className="text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer -mt-0.5 -mr-0.5 p-0.5 rounded hover:bg-hover"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-3.5">
                  {tips.map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Icon
                        className="h-[16px] w-[16px] text-muted-foreground/60 mt-[2px] shrink-0"
                        strokeWidth={1.75}
                      />
                      <p className="text-[13px] text-muted-foreground leading-relaxed">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-5">
                  <button
                    onClick={() => setShowTips(false)}
                    className="rounded-lg bg-muted hover:bg-muted-foreground/10 px-4 py-2 text-[13px] font-medium transition-colors cursor-pointer"
                  >
                    Got it
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Inspo Flow */}
          {draft ? (
            <div className="ml-14">
              <div className="overflow-hidden rounded-xl border border-border bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                {/* Row 1: Format toggle + Topic input */}
                <div className="flex items-end gap-4 p-4 pb-0">
                  <div className="shrink-0">
                    <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                      Format
                    </p>
                    <div className="flex items-center gap-1 rounded-lg bg-[#f4f5f7] p-1">
                      {(["article", "tweet"] as const).map((type) => {
                        const isSelected = contentType === type;
                        return (
                          <button
                            key={type}
                            onClick={() => setContentType(type)}
                            className={`relative rounded-md px-3.5 py-1.5 text-[13px] font-medium capitalize transition-all ${
                              isSelected
                                ? "bg-white text-[#101828] shadow-sm"
                                : "text-[#667085] hover:text-[#344054]"
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                      Topic
                    </p>
                    <input
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleInspo();
                      }}
                      placeholder='e.g. "why most SaaS landing pages are boring"'
                      className="h-[34px] w-full rounded-lg border border-border bg-[#f9fafb] px-3 text-[13px] text-[#101828] placeholder:text-muted-foreground/45 focus:border-[#98b6ff] focus:bg-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Inspo button + loading / reopen */}
                <div className="flex items-center gap-3 p-4">
                  <button
                    onClick={handleInspo}
                    disabled={!contentType || !topic.trim() || isLoading}
                    className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-4 py-2 text-[13px] font-semibold text-white transition-all hover:shadow-md hover:shadow-purple-500/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
                  >
                    {isLoading ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4 transition-transform group-hover:scale-110" />
                    )}
                    {isLoading ? "Finding inspo..." : "Get Inspo"}
                  </button>

                  <AnimatePresence>
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        className="flex min-w-0 flex-1 items-center gap-2.5"
                      >
                        <div className="h-1.5 w-20 shrink-0 overflow-hidden rounded-full bg-[#e0e7ff]">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed]"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3, ease: "easeInOut" }}
                          />
                        </div>
                        <p className="truncate text-[12px] font-medium text-[#2563eb]">
                          {loadingMessages[loadingIndex]}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isLoading && showInspoPanel && (
                    <p className="text-[12px] text-muted-foreground/60">
                      Panel open
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-sm text-muted-foreground">
                Select a draft or create a new one to start writing
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div className="border-t border-border px-5 h-[48px] shrink-0 flex items-center justify-center">
        <div className="flex items-center gap-0.5">
          {bottomToolbarIcons.map((Icon, i) => (
            <button
              key={i}
              className="rounded-lg p-2 text-muted-foreground/35 hover:text-muted-foreground/60 hover:bg-hover transition-colors cursor-pointer"
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </button>
          ))}
        </div>
      </div>

      {/* X Preview Overlay */}
      <AnimatePresence>
        {showPreview && draft?.content?.trim() && (
          <XFeedPreview
            content={draft.content}
            onClose={() => setShowPreview(false)}
          />
        )}
      </AnimatePresence>

      {/* Inspo Side Panel */}
      <AnimatePresence>
        {showInspoPanel && contentType && (
          <InspoPanel
            contentType={contentType}
            onClose={() => setShowInspoPanel(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
