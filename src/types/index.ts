export interface XPost {
  id: string;
  handle: string;
  displayName: string;
  avatarUrl: string;
  text: string;
  date: string;
  likes: number;
  replies: number;
  reposts: number;
  quotes: number;
  bookmarks: number;
  impressions: number;
  isThread: boolean;
  isReply: boolean;
}

export interface SavedPost extends XPost {
  savedAt: string;
  userId: string;
  dbId?: string;
}

export interface Draft {
  id: string;
  userId: string;
  title: string;
  content: string;
  isThread: boolean;
  goalNote: string;
  createdAt: string;
  updatedAt: string;
  platform?: "twitter";
  status?: "draft" | "scheduled" | "posted";
  scheduledFor?: string;
}

export type TabId = "navigator" | "bank" | "drafts";

export type PostFilter = "all" | "threads" | "no-replies";

export type DraftTab = "drafts" | "scheduled" | "posted";
