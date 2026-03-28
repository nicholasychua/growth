"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface HandleInputProps {
  onFetch: (handle: string) => void;
  loading: boolean;
}

export function HandleInput({ onFetch, loading }: HandleInputProps) {
  const [handle, setHandle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (handle.trim()) {
      onFetch(handle.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
          @
        </span>
        <Input
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="handle (e.g. sahilbloom)"
          className="pl-7"
        />
      </div>
      <Button type="submit" disabled={loading || !handle.trim()}>
        {loading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <Search className="h-4 w-4" />
        )}
        <span>Fetch Posts</span>
      </Button>
    </form>
  );
}
