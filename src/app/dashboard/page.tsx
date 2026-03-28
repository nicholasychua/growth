"use client";

import { useState, useEffect, useCallback } from "react";
import { Sidebar } from "@/components/typefully/sidebar";
import { Composer } from "@/components/typefully/composer";
import type { Draft, DraftTab } from "@/types";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function createEmptyDraft(): Draft {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    userId: "",
    title: "",
    content: "",
    isThread: false,
    goalNote: "",
    platform: "twitter",
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };
}

const STORAGE_KEY = "growth-typefully-drafts";

export default function DashboardPage() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [activeDraftId, setActiveDraftId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<DraftTab>("drafts");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Draft[] = JSON.parse(stored);
        if (parsed.length > 0) {
          setDrafts(parsed);
          setActiveDraftId(parsed[0].id);
        } else {
          const first = createEmptyDraft();
          setDrafts([first]);
          setActiveDraftId(first.id);
        }
      } else {
        const first = createEmptyDraft();
        setDrafts([first]);
        setActiveDraftId(first.id);
      }
    } catch {
      const first = createEmptyDraft();
      setDrafts([first]);
      setActiveDraftId(first.id);
    }
    setLoaded(true);
  }, []);

  const persist = useCallback((updated: Draft[]) => {
    setDrafts(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // storage full or unavailable
    }
  }, []);

  const handleNewDraft = useCallback(() => {
    const newDraft = createEmptyDraft();
    const updated = [newDraft, ...drafts];
    persist(updated);
    setActiveDraftId(newDraft.id);
  }, [drafts, persist]);

  const handleUpdateContent = useCallback(
    (content: string) => {
      if (!activeDraftId) return;
      const updated = drafts.map((d) =>
        d.id === activeDraftId
          ? { ...d, content, updatedAt: new Date().toISOString() }
          : d
      );
      persist(updated);
    },
    [activeDraftId, drafts, persist]
  );

  const handleDeleteDraft = useCallback(
    (id: string) => {
      const updated = drafts.filter((d) => d.id !== id);
      persist(updated);
      if (activeDraftId === id) {
        setActiveDraftId(updated.length > 0 ? updated[0].id : null);
      }
    },
    [drafts, activeDraftId, persist]
  );

  const filteredDrafts = drafts.filter((d) => {
    const status = d.status || "draft";
    if (activeTab === "drafts") return status === "draft";
    if (activeTab === "scheduled") return status === "scheduled";
    if (activeTab === "posted") return status === "posted";
    return true;
  });

  const activeDraft = drafts.find((d) => d.id === activeDraftId) || null;

  if (!loaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        drafts={filteredDrafts}
        activeDraftId={activeDraftId}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSelectDraft={setActiveDraftId}
        onNewDraft={handleNewDraft}
        onDeleteDraft={handleDeleteDraft}
      />
      <Composer draft={activeDraft} onUpdateContent={handleUpdateContent} />
    </div>
  );
}
