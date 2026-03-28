"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Trash2, FileText, Plus } from "lucide-react";
import type { Draft } from "@/types";

interface DraftsListProps {
  drafts: Draft[];
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
}

export function DraftsList({ drafts, onSelect, onDelete, onNew }: DraftsListProps) {
  if (drafts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No drafts yet</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Create your first draft to start writing posts and threads.
        </p>
        <Button onClick={onNew} className="mt-4">
          <Plus className="h-4 w-4" />
          New Draft
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {drafts.map((draft) => {
        const preview = draft.content.slice(0, 120) || "Empty draft";
        const isThread = draft.content.includes("\n---\n");

        return (
          <button
            key={draft.id}
            onClick={() => onSelect(draft.id)}
            className="group w-full text-left rounded-xl border border-border p-4 transition-colors hover:bg-muted/30 cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium truncate">
                    {draft.title || "Untitled Draft"}
                  </p>
                  {isThread && <Badge variant="secondary">Thread</Badge>}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {preview}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Edited {formatDate(draft.updatedAt)}
                </p>
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(draft.id);
                }}
                className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-muted cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
