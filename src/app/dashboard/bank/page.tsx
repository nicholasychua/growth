"use client";

import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatNumber, formatDate } from "@/lib/utils";
import {
  Search,
  Trash2,
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  Eye,
  FolderOpen,
} from "lucide-react";
import type { SavedPost } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

export default function BankPage() {
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);
  const [search, setSearch] = useState("");
  const [selectedHandle, setSelectedHandle] = useState<string | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedPosts") || "[]");
    setSavedPosts(stored);
  }, []);

  const handles = useMemo(() => {
    const handleSet = new Set(savedPosts.map((p) => p.handle));
    return Array.from(handleSet).sort();
  }, [savedPosts]);

  const filteredPosts = useMemo(() => {
    return savedPosts.filter((post) => {
      const matchesHandle = !selectedHandle || post.handle === selectedHandle;
      const matchesSearch =
        !search ||
        post.text.toLowerCase().includes(search.toLowerCase()) ||
        post.handle.toLowerCase().includes(search.toLowerCase());
      return matchesHandle && matchesSearch;
    });
  }, [savedPosts, selectedHandle, search]);

  const handleRemove = (postId: string) => {
    const updated = savedPosts.filter((p) => p.id !== postId);
    setSavedPosts(updated);
    localStorage.setItem("savedPosts", JSON.stringify(updated));
  };

  if (savedPosts.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Inspiration Bank
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Your saved posts and inspiration
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="rounded-full bg-muted p-4 mb-4">
            <FolderOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No saved posts yet</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            Go to the Navigator tab, fetch an account&apos;s posts, and save the
            ones that inspire you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Inspiration Bank
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {savedPosts.length} saved post{savedPosts.length !== 1 ? "s" : ""}{" "}
          from {handles.length} account{handles.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by handle or keyword..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedHandle(null)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
            !selectedHandle
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          All
        </button>
        {handles.map((handle) => (
          <button
            key={handle}
            onClick={() =>
              setSelectedHandle(handle === selectedHandle ? null : handle)
            }
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              selectedHandle === handle
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            @{handle}
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        <div className="space-y-2">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="group rounded-xl border border-border p-4 transition-colors hover:bg-muted/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">
                      @{post.handle}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(post.date)}
                    </span>
                    {post.isThread && <Badge variant="secondary">Thread</Badge>}
                  </div>

                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {post.text}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5" />{" "}
                      {formatNumber(post.likes)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3.5 w-3.5" />{" "}
                      {formatNumber(post.replies)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Repeat2 className="h-3.5 w-3.5" />{" "}
                      {formatNumber(post.reposts)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bookmark className="h-3.5 w-3.5" />{" "}
                      {formatNumber(post.bookmarks)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />{" "}
                      {formatNumber(post.impressions)}
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemove(post.id)}
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {filteredPosts.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-sm text-muted-foreground">
            No posts match your search.
          </p>
        </div>
      )}
    </div>
  );
}
