"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Copy,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Plus,
  Calendar,
  BarChart3,
  Globe,
  HelpCircle,
  Settings,
  Zap,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Draft, DraftTab } from "@/types";

function XLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface SidebarProps {
  drafts: Draft[];
  activeDraftId: string | null;
  activeTab: DraftTab;
  onTabChange: (tab: DraftTab) => void;
  onSelectDraft: (id: string) => void;
  onNewDraft: () => void;
  onDeleteDraft: (id: string) => void;
}

const tabs: { id: DraftTab; label: string }[] = [
  { id: "drafts", label: "Drafts" },
  { id: "scheduled", label: "Scheduled" },
  { id: "posted", label: "Posted" },
];

const navItems = [
  { icon: Zap, label: "Start Free Trial", highlight: true },
  { icon: Calendar, label: "Calendar", highlight: false },
  { icon: BarChart3, label: "Analytics", highlight: false },
  { icon: Globe, label: "Public Profile", highlight: false },
  { icon: HelpCircle, label: "Help", highlight: false },
  { icon: Settings, label: "Settings", highlight: false },
];

export function Sidebar({
  drafts,
  activeDraftId,
  activeTab,
  onTabChange,
  onSelectDraft,
  onNewDraft,
  onDeleteDraft,
}: SidebarProps) {
  const [listCollapsed, setListCollapsed] = useState(false);
  return (
    <aside className="flex h-full w-[280px] shrink-0 flex-col border-r border-border bg-background select-none">
      {/* User Header */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <button className="flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-hover transition-colors cursor-pointer">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center text-white text-[11px] font-semibold shrink-0">
            N
          </div>
          <span className="text-[13px] font-semibold tracking-[-0.01em]">
            Nicholas Chua
          </span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>
        <div className="flex items-center">
          {[Search, RefreshCw, Copy].map((Icon, i) => (
            <button
              key={i}
              className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-hover transition-colors cursor-pointer"
            >
              <Icon className="h-[15px] w-[15px]" strokeWidth={2} />
            </button>
          ))}
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex border-b border-border px-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative px-2.5 pb-2.5 pt-1 text-[13px] font-medium transition-colors cursor-pointer",
              activeTab === tab.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground/70"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="sidebarActiveTab"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground rounded-full"
                transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* New Draft Button */}
      <button
        onClick={onNewDraft}
        className="flex items-center justify-between px-4 py-2.5 text-[13px] text-muted-foreground hover:text-foreground hover:bg-hover transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          New draft
        </span>
        <ChevronDown className="h-3 w-3" />
      </button>

      {/* Draft List */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <AnimatePresence initial={false}>
          {!listCollapsed &&
            drafts.map((draft) => {
              const preview =
                draft.content.slice(0, 100) || "Empty draft";
              const isActive = activeDraftId === draft.id;

              return (
                <motion.div
                  key={draft.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelectDraft(draft.id)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelectDraft(draft.id); }}
                    className={cn(
                      "group w-full text-left px-4 py-3 border-b border-border transition-colors cursor-pointer",
                      isActive ? "bg-accent/60" : "hover:bg-hover"
                    )}
                  >
                    <p
                      className={cn(
                        "text-[13px] line-clamp-2 leading-[1.45]",
                        draft.content
                          ? "text-foreground"
                          : "text-muted-foreground italic"
                      )}
                    >
                      {preview}
                    </p>
                    <div className="mt-1.5 flex items-center justify-between">
                      <XLogo className="h-3 w-3 text-muted-foreground/60" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteDraft(draft.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-muted-foreground hover:text-destructive transition-all cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </AnimatePresence>

        {/* Empty State */}
        {!listCollapsed && drafts.length === 0 && (
          <div className="px-4 py-8 text-center">
            <p className="text-[13px] text-muted-foreground">
              No {activeTab === "drafts" ? "drafts" : activeTab} yet
            </p>
          </div>
        )}

        {/* Collapse Toggle */}
        <button
          onClick={() => setListCollapsed(!listCollapsed)}
          className="w-full flex justify-center py-2.5 text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer"
        >
          {listCollapsed ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation Footer */}
      <nav className="border-t border-border px-2 py-1.5 space-y-0.5">
        {navItems.map(({ icon: Icon, label, highlight }) => (
          <button
            key={label}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[13px] transition-colors cursor-pointer",
              highlight
                ? "text-primary font-medium hover:bg-accent"
                : "text-muted-foreground hover:text-foreground hover:bg-hover"
            )}
          >
            <Icon className="h-[15px] w-[15px]" strokeWidth={highlight ? 2.5 : 1.75} />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
