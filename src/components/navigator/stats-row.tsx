"use client";

import { formatNumber } from "@/lib/utils";
import type { XPost } from "@/types";

interface StatsRowProps {
  posts: XPost[];
  handle: string;
}

export function StatsRow({ posts, handle }: StatsRowProps) {
  const totalPosts = posts.length;
  const avgLikes = Math.round(posts.reduce((sum, p) => sum + p.likes, 0) / totalPosts);
  const avgReplies = Math.round(posts.reduce((sum, p) => sum + p.replies, 0) / totalPosts);
  const avgReposts = Math.round(posts.reduce((sum, p) => sum + p.reposts, 0) / totalPosts);
  const totalImpressions = posts.reduce((sum, p) => sum + p.impressions, 0);
  const threads = posts.filter((p) => p.isThread).length;

  const stats = [
    { label: "Posts", value: totalPosts.toString() },
    { label: "Avg Likes", value: formatNumber(avgLikes) },
    { label: "Avg Replies", value: formatNumber(avgReplies) },
    { label: "Avg Reposts", value: formatNumber(avgReposts) },
    { label: "Total Impressions", value: formatNumber(totalImpressions) },
    { label: "Threads", value: threads.toString() },
  ];

  return (
    <div className="rounded-xl border border-border bg-muted/30 p-4">
      <p className="text-sm font-medium text-muted-foreground mb-3">
        @{handle} — Overview
      </p>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-lg font-semibold tabular-nums">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
