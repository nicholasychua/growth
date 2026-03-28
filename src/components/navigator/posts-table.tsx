"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatNumber, formatDate } from "@/lib/utils";
import { Bookmark, Check, Heart, MessageCircle, Repeat2, Quote, Eye, ChevronDown, ChevronUp } from "lucide-react";
import type { XPost, PostFilter } from "@/types";

interface PostsTableProps {
  posts: XPost[];
  filter: PostFilter;
  onFilterChange: (filter: PostFilter) => void;
  onSave: (post: XPost) => void;
  savedPostIds: Set<string>;
}

const filters: { id: PostFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "threads", label: "Threads" },
  { id: "no-replies", label: "No Replies" },
];

function PostCard({
  post,
  onSave,
  isSaved,
}: {
  post: XPost;
  onSave: (post: XPost) => void;
  isSaved: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = post.text.length > 180;
  const displayText = isLong && !expanded ? post.text.slice(0, 180) + "..." : post.text;

  return (
    <div className="group rounded-xl border border-border p-4 transition-colors hover:bg-muted/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">@{post.handle}</span>
            <span className="text-xs text-muted-foreground">{formatDate(post.date)}</span>
            {post.isThread && <Badge variant="secondary">Thread</Badge>}
            {post.isReply && <Badge variant="outline">Reply</Badge>}
          </div>

          <p className="text-sm whitespace-pre-wrap leading-relaxed">{displayText}</p>

          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              {expanded ? "Show less" : "Show more"}
            </button>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" /> {formatNumber(post.likes)}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" /> {formatNumber(post.replies)}
            </span>
            <span className="flex items-center gap-1">
              <Repeat2 className="h-3.5 w-3.5" /> {formatNumber(post.reposts)}
            </span>
            <span className="flex items-center gap-1">
              <Quote className="h-3.5 w-3.5" /> {formatNumber(post.quotes)}
            </span>
            <span className="flex items-center gap-1">
              <Bookmark className="h-3.5 w-3.5" /> {formatNumber(post.bookmarks)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" /> {formatNumber(post.impressions)}
            </span>
          </div>
        </div>

        <Button
          variant={isSaved ? "secondary" : "outline"}
          size="sm"
          onClick={() => onSave(post)}
          disabled={isSaved}
          className="shrink-0"
        >
          {isSaved ? (
            <>
              <Check className="h-3.5 w-3.5" /> Saved
            </>
          ) : (
            <>
              <Bookmark className="h-3.5 w-3.5" /> Save
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export function PostsTable({ posts, filter, onFilterChange, onSave, savedPostIds }: PostsTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => onFilterChange(f.id)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                filter === f.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {posts.length} post{posts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="space-y-2">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onSave={onSave}
            isSaved={savedPostIds.has(post.id)}
          />
        ))}
      </div>
    </div>
  );
}
