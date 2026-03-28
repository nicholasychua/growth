"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DraftEditor } from "@/components/drafts/draft-editor";
import { DraftsList } from "@/components/drafts/drafts-list";
import { Plus, ArrowLeft } from "lucide-react";
import type { Draft } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [activeDraftId, setActiveDraftId] = useState<string | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("drafts") || "[]");
    setDrafts(stored);
  }, []);

  const saveDrafts = (updated: Draft[]) => {
    setDrafts(updated);
    localStorage.setItem("drafts", JSON.stringify(updated));
  };

  const handleNewDraft = () => {
    const newDraft: Draft = {
      id: generateId(),
      userId: "",
      title: "",
      content: "",
      isThread: false,
      goalNote: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newDraft, ...drafts];
    saveDrafts(updated);
    setActiveDraftId(newDraft.id);
  };

  const handleSaveDraft = (draft: Draft) => {
    const updated = drafts.map((d) =>
      d.id === draft.id ? { ...draft, updatedAt: new Date().toISOString() } : d
    );
    saveDrafts(updated);
  };

  const handleDeleteDraft = (id: string) => {
    const updated = drafts.filter((d) => d.id !== id);
    saveDrafts(updated);
    if (activeDraftId === id) setActiveDraftId(null);
  };

  const activeDraft = drafts.find((d) => d.id === activeDraftId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Drafts</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Write and preview posts and threads
          </p>
        </div>
        {!activeDraft && (
          <Button onClick={handleNewDraft}>
            <Plus className="h-4 w-4" />
            New Draft
          </Button>
        )}
        {activeDraft && (
          <Button variant="outline" onClick={() => setActiveDraftId(null)}>
            <ArrowLeft className="h-4 w-4" />
            All Drafts
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {activeDraft ? (
          <motion.div
            key="editor"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <DraftEditor
              draft={activeDraft}
              onSave={handleSaveDraft}
              onDelete={() => handleDeleteDraft(activeDraft.id)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
          >
            <DraftsList
              drafts={drafts}
              onSelect={setActiveDraftId}
              onDelete={handleDeleteDraft}
              onNew={handleNewDraft}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
