"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
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
  Eye,
  Sparkles,
} from "lucide-react";
import type { Draft } from "@/types";
import { XFeedPreview } from "./x-preview";
import { InspirationPanel } from "./inspiration-panel";

function XLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function VerifiedBadge({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 22 22" fill="#0a0a0a">
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

const INSPO_COLLAPSED_KEY = "growth-inspiration-collapsed";

export function Composer({ draft, onUpdateContent }: ComposerProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [inspoCollapsed, setInspoCollapsed] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Persist the collapsed state across sessions
  useEffect(() => {
    try {
      const stored = localStorage.getItem(INSPO_COLLAPSED_KEY);
      if (stored === "1") setInspoCollapsed(true);
    } catch {
      // ignore
    }
  }, []);

  const toggleInspo = useCallback(() => {
    setInspoCollapsed((v) => {
      const next = !v;
      try {
        localStorage.setItem(INSPO_COLLAPSED_KEY, next ? "1" : "0");
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const handleApplyFromChat = useCallback(
    (text: string) => {
      const current = draft?.content ?? "";
      const trimmedCurrent = current.trimEnd();
      const next = trimmedCurrent ? `${trimmedCurrent}\n\n${text}` : text;
      onUpdateContent(next);
      // Focus the editor so the user can immediately edit
      requestAnimationFrame(() => {
        textareaRef.current?.focus();
        const el = textareaRef.current;
        if (el) {
          el.setSelectionRange(el.value.length, el.value.length);
        }
      });
    },
    [draft?.content, onUpdateContent]
  );

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

  const hasGeneratedDraft = Boolean(draft?.content?.trim());

  return (
    <div className="flex flex-1 min-w-0">
      {/* Main composer column */}
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
              <button className="inline-flex items-center gap-1.5 rounded-l-full border border-border bg-white pl-3.5 pr-3 py-[7px] text-[13px] font-mono font-medium text-foreground hover:bg-hover transition-colors cursor-pointer">
                <Clock className="h-3.5 w-3.5" />
                Schedule
              </button>
              <button className="inline-flex items-center rounded-r-full border border-l-0 border-border bg-white px-2 py-[7px] text-foreground hover:bg-hover transition-colors cursor-pointer">
                <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 5l3 3 3-3" />
                </svg>
              </button>
            </div>

            <button className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-[7px] text-[13px] font-mono font-semibold text-white hover:bg-foreground/85 transition-colors cursor-pointer shadow-sm shadow-black/10">
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

            {inspoCollapsed && (
              <button
                onClick={toggleInspo}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-[7px] text-[13px] font-mono font-medium text-foreground hover:bg-hover transition-colors cursor-pointer"
                title="Open inspiration panel"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#a855f7]" />
                Inspiration
              </button>
            )}

            <div className="ml-1 flex items-center gap-0.5">
              {headerActions.map((Icon, i) => (
                <button
                  key={i}
                  className="rounded-md p-1.5 text-muted-foreground/60 hover:text-muted-foreground hover:bg-hover transition-colors cursor-pointer"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </button>
              ))}
              <div className="ml-1 h-7 w-7 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center text-white text-[10px] font-semibold cursor-pointer hover:opacity-90 transition-opacity">
                N
              </div>
            </div>
          </div>
        </header>

        {/* Writing Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[640px] px-8 pt-10 pb-16">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-11 w-11 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center text-white text-sm font-semibold shrink-0">
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

            <div className="mb-5" />

            {draft ? (
              <div className="ml-14">
                <textarea
                  ref={textareaRef}
                  value={draft.content}
                  onChange={handleChange}
                  placeholder="What's happening?"
                  className="w-full resize-none bg-transparent text-[17px] leading-[1.5] tracking-[-0.01em] text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                  style={{ minHeight: 200 }}
                />

                <div className="mt-3 flex items-center gap-0.5">
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

        <AnimatePresence>
          {showPreview && draft?.content?.trim() && (
            <XFeedPreview
              content={draft.content}
              onClose={() => setShowPreview(false)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Inspiration sidebar */}
      <InspirationPanel
        onApplyToDraft={handleApplyFromChat}
        collapsed={inspoCollapsed}
        onToggleCollapsed={toggleInspo}
      />
    </div>
  );
}
