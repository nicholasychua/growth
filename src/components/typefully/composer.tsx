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
} from "lucide-react";
import type { Draft } from "@/types";

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

const headerActions = [Bell, Share2, ExternalLink, Settings];

const composerActions = [
  { icon: <div className="h-[18px] w-[18px] rounded-full border-[1.5px] border-current" />, label: "Record" },
  { icon: <List className="h-[17px] w-[17px]" strokeWidth={1.75} />, label: "Thread" },
  { icon: <Image className="h-[17px] w-[17px]" strokeWidth={1.75} />, label: "Media" },
  { icon: <Gift className="h-[17px] w-[17px]" strokeWidth={1.75} />, label: "Tag" },
  { icon: <MoreHorizontal className="h-[17px] w-[17px]" strokeWidth={1.75} />, label: "More" },
];

const bottomToolbarIcons = [Lightbulb, Smile, MessageCircle, List, Quote, Heart, Repeat2, Maximize2];

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

export function Composer({ draft, onUpdateContent }: ComposerProps) {
  const [showTips, setShowTips] = useState(true);
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
            <button className="inline-flex items-center gap-1.5 rounded-l-full border border-primary/25 bg-primary/[0.04] pl-3.5 pr-3 py-[7px] text-[13px] font-medium text-primary hover:bg-primary/[0.08] transition-colors cursor-pointer">
              <Clock className="h-3.5 w-3.5" />
              Schedule
            </button>
            <button className="inline-flex items-center rounded-r-full border border-l-0 border-primary/25 bg-primary/[0.04] px-2 py-[7px] text-primary hover:bg-primary/[0.08] transition-colors cursor-pointer">
              <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 5l3 3 3-3" />
              </svg>
            </button>
          </div>

          <button className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-[7px] text-[13px] font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer shadow-sm shadow-primary/20">
            Publish
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
            {showTips && (
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
                    Got it 👍
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Text Editor */}
          {draft ? (
            <div className="ml-14">
              <textarea
                ref={textareaRef}
                value={draft.content}
                onChange={handleChange}
                placeholder="What's happening?"
                className="w-full resize-none bg-transparent text-[15px] leading-[1.6] placeholder:text-muted-foreground/40 focus:outline-none min-h-[200px]"
                autoFocus
              />
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
    </div>
  );
}
