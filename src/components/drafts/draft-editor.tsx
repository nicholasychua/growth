"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X_CHAR_LIMIT } from "@/lib/utils";
import { Save, Trash2, Mic, Eye, EyeOff } from "lucide-react";
import type { Draft } from "@/types";

interface DraftEditorProps {
  draft: Draft;
  onSave: (draft: Draft) => void;
  onDelete: () => void;
}

function splitThread(content: string): string[] {
  const parts = content.split(/\n---\n/);
  return parts.map((p) => p.trim()).filter(Boolean);
}

function ThreadPreview({ content }: { content: string }) {
  const parts = splitThread(content);
  if (parts.length === 0) return null;

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        X Preview — {parts.length > 1 ? `Thread (${parts.length} posts)` : "Single Post"}
      </p>
      <div className="space-y-2">
        {parts.map((part, i) => {
          const charCount = part.length;
          const overLimit = charCount > X_CHAR_LIMIT;

          return (
            <div
              key={i}
              className="rounded-xl border border-border bg-background p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-full bg-muted" />
                <div>
                  <p className="text-sm font-medium">You</p>
                  <p className="text-xs text-muted-foreground">@you</p>
                </div>
                {parts.length > 1 && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {i + 1}/{parts.length}
                  </Badge>
                )}
              </div>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{part}</p>
              <div className="mt-2 flex items-center justify-between">
                <span
                  className={`text-xs tabular-nums ${
                    overLimit ? "text-destructive font-medium" : "text-muted-foreground"
                  }`}
                >
                  {charCount}/{X_CHAR_LIMIT}
                </span>
                {overLimit && (
                  <span className="text-xs text-destructive">
                    Over limit by {charCount - X_CHAR_LIMIT}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DraftEditor({ draft, onSave, onDelete }: DraftEditorProps) {
  const [title, setTitle] = useState(draft.title);
  const [content, setContent] = useState(draft.content);
  const [goalNote, setGoalNote] = useState(draft.goalNote);
  const [showPreview, setShowPreview] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setTitle(draft.title);
    setContent(draft.content);
    setGoalNote(draft.goalNote);
    setHasUnsavedChanges(false);
  }, [draft.id, draft.title, draft.content, draft.goalNote]);

  const handleContentChange = useCallback((value: string) => {
    setContent(value);
    setHasUnsavedChanges(true);
  }, []);

  const handleSave = useCallback(() => {
    onSave({
      ...draft,
      title,
      content,
      goalNote,
      isThread: content.includes("\n---\n"),
    });
    setHasUnsavedChanges(false);
  }, [draft, title, content, goalNote, onSave]);

  const handleDictate = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    const SpeechRecognitionCtor = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      alert("Speech recognition is not supported in this browser. Use Wispr Flow or Chrome for voice dictation.");
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript: string = event.results[0][0].transcript;
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newContent = content.slice(0, start) + transcript + content.slice(end);
        handleContentChange(newContent);
      }
    };

    recognition.start();
  }, [content, handleContentChange]);

  const isThread = content.includes("\n---\n");
  const parts = splitThread(content);
  const totalChars = parts.reduce((sum, p) => sum + p.length, 0);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setHasUnsavedChanges(true);
          }}
          placeholder="Draft title (optional)"
          className="text-base font-medium"
        />

        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Write your post here...

For threads, separate posts with --- on its own line:

First post content
---
Second post content
---
Third post content"
            className="min-h-[300px] resize-y text-sm leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="tabular-nums">{totalChars} chars</span>
            {isThread && (
              <Badge variant="secondary">{parts.length} posts</Badge>
            )}
            {hasUnsavedChanges && (
              <span className="text-amber-500">Unsaved changes</span>
            )}
          </div>
        </div>

        <Input
          value={goalNote}
          onChange={(e) => {
            setGoalNote(e.target.value);
            setHasUnsavedChanges(true);
          }}
          placeholder="Goal note (optional) — what's this draft for?"
          className="text-sm"
        />

        <div className="flex items-center gap-2">
          <Button onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Button variant="outline" onClick={handleDictate}>
            <Mic className="h-4 w-4" />
            Dictate
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
            className="lg:hidden"
          >
            {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            Preview
          </Button>
          <div className="flex-1" />
          <Button variant="ghost" onClick={onDelete} className="text-muted-foreground hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className={`${showPreview ? "block" : "hidden"} lg:block`}>
        <div className="sticky top-20">
          {content.trim() ? (
            <ThreadPreview content={content} />
          ) : (
            <div className="rounded-xl border border-dashed border-border p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Start writing to see a preview
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
