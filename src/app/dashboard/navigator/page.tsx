"use client";

import { useState, useCallback } from "react";
import { getMockPosts } from "@/lib/mock-data";
import { HandleInput } from "@/components/navigator/handle-input";
import { PostsTable } from "@/components/navigator/posts-table";
import { StatsRow } from "@/components/navigator/stats-row";
import type { XPost, PostFilter } from "@/types";

export default function NavigatorPage() {
  const [posts, setPosts] = useState<XPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentHandle, setCurrentHandle] = useState("");
  const [filter, setFilter] = useState<PostFilter>("all");
  const [savedPostIds, setSavedPostIds] = useState<Set<string>>(new Set());

  const handleFetch = useCallback((handle: string) => {
    setLoading(true);
    setCurrentHandle(handle.replace("@", ""));

    // Simulate network delay
    setTimeout(() => {
      const fetchedPosts = getMockPosts(handle);
      setPosts(fetchedPosts);
      setLoading(false);
    }, 600);
  }, []);

  const handleSaveToBank = useCallback((post: XPost) => {
    const saved = JSON.parse(localStorage.getItem("savedPosts") || "[]");
    const alreadySaved = saved.some((p: XPost) => p.id === post.id);
    if (!alreadySaved) {
      saved.push({ ...post, savedAt: new Date().toISOString() });
      localStorage.setItem("savedPosts", JSON.stringify(saved));
      setSavedPostIds((prev) => new Set([...prev, post.id]));
    }
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (filter === "threads") return post.isThread;
    if (filter === "no-replies") return !post.isReply;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Navigator</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Study any X account&apos;s recent posts and save inspiration
        </p>
      </div>

      <HandleInput onFetch={handleFetch} loading={loading} />

      {posts.length > 0 && (
        <>
          <StatsRow posts={posts} handle={currentHandle} />
          <PostsTable
            posts={filteredPosts}
            filter={filter}
            onFilterChange={setFilter}
            onSave={handleSaveToBank}
            savedPostIds={savedPostIds}
          />
        </>
      )}
    </div>
  );
}
