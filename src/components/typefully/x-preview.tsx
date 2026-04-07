"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

// ─── X / Twitter SVG Icons (pixel-matched to the real app) ───────────────────

function XLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function HomeIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return filled ? (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913h5.641c.511 0 .929-.41.929-.913v-7.075h3.008v7.075c0 .502.418.913.929.913h5.641c.511 0 .929-.41.929-.913V7.903c0-.3-.149-.584-.41-.757z" />
    </svg>
  ) : (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913H9.14c.51 0 .929-.41.929-.913v-7.075h3.909v7.075c0 .502.417.913.928.913h6.165c.511 0 .929-.41.929-.913V7.903c0-.3-.149-.584-.41-.757zM20 20.5h-4.159v-7.075c0-.502-.418-.913-.929-.913H9.07c-.511 0-.929.41-.929.913V20.5H4.5V8.507l7.5-4.95 7.5 4.95H20V20.5z" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.858 16H5.134z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v.511l8 5.25 8-5.25V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 2.239l-8 5.25-8-5.25V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5V7.239z" />
    </svg>
  );
}

function BookmarkNavIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z" />
    </svg>
  );
}

function ProfileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z" />
    </svg>
  );
}

function MoreCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.75 12c0-4.56 3.69-8.25 8.25-8.25s8.25 3.69 8.25 8.25-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12zM12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zM8.25 12c0 .69-.56 1.25-1.25 1.25S5.75 12.69 5.75 12 6.31 10.75 7 10.75s1.25.56 1.25 1.25zm5 0c0 .69-.56 1.25-1.25 1.25s-1.25-.56-1.25-1.25.56-1.25 1.25-1.25 1.25.56 1.25 1.25zm3.75 1.25c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25 1.25.56 1.25 1.25 1.25z" />
    </svg>
  );
}

function ReplyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.25-.893 4.34-2.457 5.86-1.563 1.52-3.63 2.37-5.79 2.37h-.057c-1.908 0-3.77-.54-5.376-1.55L1.751 20V10zm8.005-6c-3.317 0-6.005 2.69-6.005 6v6.59l5.115-2.46.338.16c1.335.65 2.8.99 4.296.99h.057c1.623 0 3.156-.63 4.325-1.77 1.168-1.14 1.868-2.72 1.868-4.38C19.75 5.64 17.117 4 14.122 4H9.756z" />
    </svg>
  );
}

function RetweetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2h3v2h-3c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H13.5V4h3c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" />
    </svg>
  );
}

function ViewIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.75 21V3h2v18h-2zM18.75 21V8h2v13h-2zM13.75 21v-9h2v9h-2zM3.75 21v-5h2v5h-2z" />
    </svg>
  );
}

function BookmarkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z" />
    </svg>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z" />
    </svg>
  );
}

function VerifiedBadge({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 22 22" fill="#1d9bf0">
      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.69-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.636.433 1.221.878 1.69.47.446 1.055.752 1.69.883.635.13 1.294.083 1.902-.144.271.587.702 1.087 1.24 1.44s1.167.551 1.813.568c.647-.017 1.277-.213 1.817-.567s.972-.854 1.245-1.44c.604.223 1.26.27 1.894.14.636-.132 1.22-.437 1.69-.884.445-.47.75-1.055.88-1.69.131-.634.084-1.29-.139-1.896.587-.273 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
    </svg>
  );
}

function ThreeDotsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
    </svg>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const X_FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

// ─── Nav Item ────────────────────────────────────────────────────────────────

function NavItem({
  icon,
  label,
  bold,
}: {
  icon: React.ReactNode;
  label: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center gap-5 rounded-full px-3 py-3 hover:bg-[#e7e7e8] transition-colors cursor-pointer">
      {icon}
      <span
        className="text-[20px] leading-6 tracking-[0.01em]"
        style={{
          fontFamily: X_FONT,
          fontWeight: bold ? 700 : 400,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── "Who to follow" person row ──────────────────────────────────────────────

function FollowRow({
  name,
  handle,
  color,
}: {
  name: string;
  handle: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 hover:bg-[#f7f7f7] transition-colors cursor-pointer">
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="h-10 w-10 rounded-full shrink-0"
          style={{ background: color }}
        />
        <div className="min-w-0">
          <p
            className="text-[15px] font-bold leading-5 truncate"
            style={{ fontFamily: X_FONT, color: "#0f1419" }}
          >
            {name}
          </p>
          <p
            className="text-[13px] leading-4 truncate"
            style={{ fontFamily: X_FONT, color: "#536471" }}
          >
            @{handle}
          </p>
        </div>
      </div>
      <button
        className="shrink-0 ml-3 rounded-full bg-[#0f1419] text-white text-[14px] font-bold px-4 py-[6px] hover:bg-[#272c30] transition-colors cursor-pointer"
        style={{ fontFamily: X_FONT }}
      >
        Follow
      </button>
    </div>
  );
}

// ─── Main Preview ────────────────────────────────────────────────────────────

interface XPreviewProps {
  content: string;
  displayName?: string;
  handle?: string;
  onClose: () => void;
}

export function XPreview({
  content,
  displayName = "Nicholas Chua",
  handle = "nicholasychua",
  onClose,
}: XPreviewProps) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const dateStr = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex"
      style={{ fontFamily: X_FONT, background: "#ffffff" }}
    >
      {/* Close button (floating) */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[60] rounded-full bg-[#0f1419]/80 text-white p-2 hover:bg-[#0f1419] transition-colors cursor-pointer shadow-lg"
        title="Close preview"
      >
        <X className="h-5 w-5" />
      </button>

      {/* ─── Left Sidebar ─────────────────────────────────────── */}
      <div className="w-[275px] shrink-0 flex flex-col items-end border-r border-[#eff3f4] pr-3 pt-1 overflow-y-auto">
        <div className="w-[258px] flex flex-col">
          {/* X Logo */}
          <div className="px-3 py-3">
            <XLogo className="h-[30px] w-[30px]" />
          </div>

          <nav className="flex flex-col mt-0.5">
            <NavItem
              icon={<HomeIcon className="h-[26px] w-[26px]" filled />}
              label="Home"
              bold
            />
            <NavItem
              icon={<SearchIcon className="h-[26px] w-[26px]" />}
              label="Explore"
            />
            <NavItem
              icon={<BellIcon className="h-[26px] w-[26px]" />}
              label="Notifications"
            />
            <NavItem
              icon={<MailIcon className="h-[26px] w-[26px]" />}
              label="Messages"
            />
            <NavItem
              icon={<BookmarkNavIcon className="h-[26px] w-[26px]" />}
              label="Bookmarks"
            />
            <NavItem
              icon={<ProfileIcon className="h-[26px] w-[26px]" />}
              label="Profile"
            />
            <NavItem
              icon={<MoreCircleIcon className="h-[26px] w-[26px]" />}
              label="More"
            />
          </nav>

          {/* Post button */}
          <button
            className="mt-4 w-[232px] rounded-full bg-[#1d9bf0] text-white text-[17px] font-bold py-[14px] hover:bg-[#1a8cd8] transition-colors cursor-pointer"
            style={{ fontFamily: X_FONT }}
          >
            Post
          </button>
        </div>
      </div>

      {/* ─── Main Feed ────────────────────────────────────────── */}
      <div className="flex-1 max-w-[600px] border-r border-[#eff3f4] flex flex-col overflow-y-auto">
        {/* Header */}
        <div
          className="sticky top-0 z-10 bg-white/85 backdrop-blur-md px-4 pt-3 pb-0 border-b border-[#eff3f4]"
        >
          <h2
            className="text-[20px] font-bold leading-6 mb-3"
            style={{ fontFamily: X_FONT, color: "#0f1419" }}
          >
            Home
          </h2>
          <div className="flex">
            <button className="flex-1 text-center relative pb-3 cursor-pointer">
              <span
                className="text-[15px] font-bold"
                style={{ fontFamily: X_FONT, color: "#0f1419" }}
              >
                For you
              </span>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[4px] w-[56px] rounded-full bg-[#1d9bf0]" />
            </button>
            <button className="flex-1 text-center relative pb-3 cursor-pointer">
              <span
                className="text-[15px]"
                style={{ fontFamily: X_FONT, color: "#536471" }}
              >
                Following
              </span>
            </button>
          </div>
        </div>

        {/* ─── The Tweet ──────────────────────────────────────── */}
        <article className="px-4 pt-3 pb-0 border-b border-[#eff3f4]">
          <div className="flex gap-3">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-[13px] font-bold">
                NC
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 min-w-0">
              {/* Name row */}
              <div className="flex items-center gap-1">
                <span
                  className="text-[15px] font-bold leading-5 truncate"
                  style={{ fontFamily: X_FONT, color: "#0f1419" }}
                >
                  {displayName}
                </span>
                <VerifiedBadge className="h-[18px] w-[18px] shrink-0" />
                <span
                  className="text-[15px] leading-5 truncate"
                  style={{ fontFamily: X_FONT, color: "#536471" }}
                >
                  @{handle}
                </span>
                <span
                  className="text-[15px] leading-5 shrink-0"
                  style={{ color: "#536471" }}
                >
                  ·
                </span>
                <span
                  className="text-[15px] leading-5 shrink-0 hover:underline cursor-pointer"
                  style={{ fontFamily: X_FONT, color: "#536471" }}
                >
                  now
                </span>
                <div className="ml-auto shrink-0">
                  <ThreeDotsIcon className="h-[18.75px] w-[18.75px] text-[#536471] hover:text-[#1d9bf0] cursor-pointer" />
                </div>
              </div>

              {/* Tweet content */}
              <div className="mt-1">
                <p
                  className="text-[15px] leading-5 whitespace-pre-wrap break-words"
                  style={{ fontFamily: X_FONT, color: "#0f1419" }}
                >
                  {content || "What's happening?"}
                </p>
              </div>

              {/* Timestamp */}
              <div className="mt-3">
                <span
                  className="text-[15px] leading-5 hover:underline cursor-pointer"
                  style={{ fontFamily: X_FONT, color: "#536471" }}
                >
                  {timeStr} · {dateStr}
                </span>
              </div>

              {/* Engagement stats */}
              <div className="flex items-center gap-4 mt-3 py-3 border-t border-[#eff3f4]">
                <span className="text-[13px] leading-4" style={{ color: "#536471" }}>
                  <span className="font-bold" style={{ color: "#0f1419" }}>0</span> Reposts
                </span>
                <span className="text-[13px] leading-4" style={{ color: "#536471" }}>
                  <span className="font-bold" style={{ color: "#0f1419" }}>0</span> Quotes
                </span>
                <span className="text-[13px] leading-4" style={{ color: "#536471" }}>
                  <span className="font-bold" style={{ color: "#0f1419" }}>0</span> Likes
                </span>
                <span className="text-[13px] leading-4" style={{ color: "#536471" }}>
                  <span className="font-bold" style={{ color: "#0f1419" }}>0</span> Bookmarks
                </span>
              </div>

              {/* Action bar */}
              <div className="flex items-center justify-around py-1 border-t border-[#eff3f4] -mx-2">
                <button className="group flex items-center rounded-full p-2 hover:bg-[#1d9bf0]/10 transition-colors cursor-pointer">
                  <ReplyIcon className="h-[22px] w-[22px] text-[#536471] group-hover:text-[#1d9bf0]" />
                </button>
                <button className="group flex items-center rounded-full p-2 hover:bg-[#00ba7c]/10 transition-colors cursor-pointer">
                  <RetweetIcon className="h-[22px] w-[22px] text-[#536471] group-hover:text-[#00ba7c]" />
                </button>
                <button className="group flex items-center rounded-full p-2 hover:bg-[#f91880]/10 transition-colors cursor-pointer">
                  <HeartIcon className="h-[22px] w-[22px] text-[#536471] group-hover:text-[#f91880]" />
                </button>
                <button className="group flex items-center rounded-full p-2 hover:bg-[#1d9bf0]/10 transition-colors cursor-pointer">
                  <ViewIcon className="h-[22px] w-[22px] text-[#536471] group-hover:text-[#1d9bf0]" />
                </button>
                <div className="flex items-center gap-0">
                  <button className="group flex items-center rounded-full p-2 hover:bg-[#1d9bf0]/10 transition-colors cursor-pointer">
                    <BookmarkIcon className="h-[22px] w-[22px] text-[#536471] group-hover:text-[#1d9bf0]" />
                  </button>
                  <button className="group flex items-center rounded-full p-2 hover:bg-[#1d9bf0]/10 transition-colors cursor-pointer">
                    <ShareIcon className="h-[22px] w-[22px] text-[#536471] group-hover:text-[#1d9bf0]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Empty space below to mimic feed */}
        <div className="flex-1" />
      </div>

      {/* ─── Right Sidebar ────────────────────────────────────── */}
      <div className="w-[350px] shrink-0 pl-6 pr-4 pt-2 overflow-y-auto hidden xl:block">
        {/* Search */}
        <div className="sticky top-0 bg-white pt-1 pb-3">
          <div className="flex items-center gap-3 rounded-full bg-[#eff3f4] px-4 py-[10px]">
            <SearchIcon className="h-[18px] w-[18px] text-[#536471]" />
            <span
              className="text-[15px]"
              style={{ fontFamily: X_FONT, color: "#536471" }}
            >
              Search
            </span>
          </div>
        </div>

        {/* Who to follow */}
        <div className="mt-3 rounded-2xl bg-[#f7f9f9] overflow-hidden">
          <h3
            className="text-[20px] font-extrabold leading-6 px-4 py-3"
            style={{ fontFamily: X_FONT, color: "#0f1419" }}
          >
            Who to follow
          </h3>
          <FollowRow name="Typefully" handle="typefully" color="#1d9bf0" />
          <FollowRow name="Fabrizio Rinaldi" handle="linuz90" color="#6366f1" />
          <FollowRow name="Francesco Di Lorenzo" handle="frankdilo" color="#f59e0b" />
          <div className="px-4 py-3">
            <span
              className="text-[15px] hover:underline cursor-pointer"
              style={{ fontFamily: X_FONT, color: "#1d9bf0" }}
            >
              Show more
            </span>
          </div>
        </div>

        {/* Footer links */}
        <div className="mt-4 px-4">
          <div className="flex flex-wrap gap-x-3 gap-y-0.5">
            {["Terms of Service", "Privacy Policy", "Cookie Policy", "Accessibility", "Ads info", "More"].map(
              (t) => (
                <span
                  key={t}
                  className="text-[13px] leading-4 hover:underline cursor-pointer"
                  style={{ fontFamily: X_FONT, color: "#536471" }}
                >
                  {t}
                </span>
              )
            )}
          </div>
          <p
            className="text-[13px] leading-4 mt-1"
            style={{ fontFamily: X_FONT, color: "#536471" }}
          >
            © 2026 X Corp.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Compact inline preview (for thread mode) ────────────────────────────────

interface XFeedPreviewProps {
  content: string;
  displayName?: string;
  handle?: string;
  onClose: () => void;
}

export function XFeedPreview({
  content,
  displayName = "Nicholas Chua",
  handle = "nicholasychua",
  onClose,
}: XFeedPreviewProps) {
  const parts = content
    .split(/\n---\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length <= 1) {
    return (
      <XPreview
        content={content}
        displayName={displayName}
        handle={handle}
        onClose={onClose}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex"
      style={{ fontFamily: X_FONT, background: "#ffffff" }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[60] rounded-full bg-[#0f1419]/80 text-white p-2 hover:bg-[#0f1419] transition-colors cursor-pointer shadow-lg"
        title="Close preview"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Left Sidebar */}
      <div className="w-[275px] shrink-0 flex flex-col items-end border-r border-[#eff3f4] pr-3 pt-1 overflow-y-auto">
        <div className="w-[258px] flex flex-col">
          <div className="px-3 py-3">
            <XLogo className="h-[30px] w-[30px]" />
          </div>
          <nav className="flex flex-col mt-0.5">
            <NavItem icon={<HomeIcon className="h-[26px] w-[26px]" filled />} label="Home" bold />
            <NavItem icon={<SearchIcon className="h-[26px] w-[26px]" />} label="Explore" />
            <NavItem icon={<BellIcon className="h-[26px] w-[26px]" />} label="Notifications" />
            <NavItem icon={<MailIcon className="h-[26px] w-[26px]" />} label="Messages" />
            <NavItem icon={<BookmarkNavIcon className="h-[26px] w-[26px]" />} label="Bookmarks" />
            <NavItem icon={<ProfileIcon className="h-[26px] w-[26px]" />} label="Profile" />
            <NavItem icon={<MoreCircleIcon className="h-[26px] w-[26px]" />} label="More" />
          </nav>
          <button
            className="mt-4 w-[232px] rounded-full bg-[#1d9bf0] text-white text-[17px] font-bold py-[14px] hover:bg-[#1a8cd8] transition-colors cursor-pointer"
            style={{ fontFamily: X_FONT }}
          >
            Post
          </button>
        </div>
      </div>

      {/* Main Feed */}
      <div className="flex-1 max-w-[600px] border-r border-[#eff3f4] flex flex-col overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white/85 backdrop-blur-md px-4 pt-3 pb-0 border-b border-[#eff3f4]">
          <h2
            className="text-[20px] font-bold leading-6 mb-3"
            style={{ fontFamily: X_FONT, color: "#0f1419" }}
          >
            Home
          </h2>
          <div className="flex">
            <button className="flex-1 text-center relative pb-3 cursor-pointer">
              <span className="text-[15px] font-bold" style={{ fontFamily: X_FONT, color: "#0f1419" }}>
                For you
              </span>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[4px] w-[56px] rounded-full bg-[#1d9bf0]" />
            </button>
            <button className="flex-1 text-center relative pb-3 cursor-pointer">
              <span className="text-[15px]" style={{ fontFamily: X_FONT, color: "#536471" }}>
                Following
              </span>
            </button>
          </div>
        </div>

        {/* Thread tweets */}
        {parts.map((part, i) => (
          <article
            key={i}
            className="px-4 pt-3 pb-0 border-b border-[#eff3f4]"
          >
            <div className="flex gap-3">
              <div className="shrink-0 flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-[13px] font-bold">
                  NC
                </div>
                {i < parts.length - 1 && (
                  <div className="w-[2px] flex-1 bg-[#cfd9de] mt-1 mb-[-12px]" />
                )}
              </div>
              <div className="flex-1 min-w-0 pb-3">
                <div className="flex items-center gap-1">
                  <span className="text-[15px] font-bold leading-5 truncate" style={{ fontFamily: X_FONT, color: "#0f1419" }}>
                    {displayName}
                  </span>
                  <VerifiedBadge className="h-[18px] w-[18px] shrink-0" />
                  <span className="text-[15px] leading-5 truncate" style={{ fontFamily: X_FONT, color: "#536471" }}>
                    @{handle}
                  </span>
                  <span className="text-[15px] leading-5 shrink-0" style={{ color: "#536471" }}>·</span>
                  <span className="text-[15px] leading-5 shrink-0" style={{ fontFamily: X_FONT, color: "#536471" }}>now</span>
                  <div className="ml-auto shrink-0">
                    <ThreeDotsIcon className="h-[18.75px] w-[18.75px] text-[#536471]" />
                  </div>
                </div>
                <p
                  className="mt-1 text-[15px] leading-5 whitespace-pre-wrap break-words"
                  style={{ fontFamily: X_FONT, color: "#0f1419" }}
                >
                  {part}
                </p>
                {/* Action bar */}
                <div className="flex items-center justify-between mt-3 -ml-2 max-w-[425px]">
                  <button className="group flex items-center gap-1 rounded-full p-2 hover:bg-[#1d9bf0]/10 transition-colors cursor-pointer">
                    <ReplyIcon className="h-[18px] w-[18px] text-[#536471] group-hover:text-[#1d9bf0]" />
                  </button>
                  <button className="group flex items-center gap-1 rounded-full p-2 hover:bg-[#00ba7c]/10 transition-colors cursor-pointer">
                    <RetweetIcon className="h-[18px] w-[18px] text-[#536471] group-hover:text-[#00ba7c]" />
                  </button>
                  <button className="group flex items-center gap-1 rounded-full p-2 hover:bg-[#f91880]/10 transition-colors cursor-pointer">
                    <HeartIcon className="h-[18px] w-[18px] text-[#536471] group-hover:text-[#f91880]" />
                  </button>
                  <button className="group flex items-center gap-1 rounded-full p-2 hover:bg-[#1d9bf0]/10 transition-colors cursor-pointer">
                    <ViewIcon className="h-[18px] w-[18px] text-[#536471] group-hover:text-[#1d9bf0]" />
                  </button>
                  <div className="flex items-center">
                    <button className="group flex items-center rounded-full p-2 hover:bg-[#1d9bf0]/10 transition-colors cursor-pointer">
                      <BookmarkIcon className="h-[18px] w-[18px] text-[#536471] group-hover:text-[#1d9bf0]" />
                    </button>
                    <button className="group flex items-center rounded-full p-2 hover:bg-[#1d9bf0]/10 transition-colors cursor-pointer">
                      <ShareIcon className="h-[18px] w-[18px] text-[#536471] group-hover:text-[#1d9bf0]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
        <div className="flex-1" />
      </div>

      {/* Right Sidebar */}
      <div className="w-[350px] shrink-0 pl-6 pr-4 pt-2 overflow-y-auto hidden xl:block">
        <div className="sticky top-0 bg-white pt-1 pb-3">
          <div className="flex items-center gap-3 rounded-full bg-[#eff3f4] px-4 py-[10px]">
            <SearchIcon className="h-[18px] w-[18px] text-[#536471]" />
            <span className="text-[15px]" style={{ fontFamily: X_FONT, color: "#536471" }}>
              Search
            </span>
          </div>
        </div>
        <div className="mt-3 rounded-2xl bg-[#f7f9f9] overflow-hidden">
          <h3
            className="text-[20px] font-extrabold leading-6 px-4 py-3"
            style={{ fontFamily: X_FONT, color: "#0f1419" }}
          >
            Who to follow
          </h3>
          <FollowRow name="Typefully" handle="typefully" color="#1d9bf0" />
          <FollowRow name="Fabrizio Rinaldi" handle="linuz90" color="#6366f1" />
          <FollowRow name="Francesco Di Lorenzo" handle="frankdilo" color="#f59e0b" />
          <div className="px-4 py-3">
            <span className="text-[15px] hover:underline cursor-pointer" style={{ fontFamily: X_FONT, color: "#1d9bf0" }}>
              Show more
            </span>
          </div>
        </div>
        <div className="mt-4 px-4">
          <div className="flex flex-wrap gap-x-3 gap-y-0.5">
            {["Terms of Service", "Privacy Policy", "Cookie Policy", "Accessibility", "Ads info", "More"].map(
              (t) => (
                <span
                  key={t}
                  className="text-[13px] leading-4 hover:underline cursor-pointer"
                  style={{ fontFamily: X_FONT, color: "#536471" }}
                >
                  {t}
                </span>
              )
            )}
          </div>
          <p className="text-[13px] leading-4 mt-1" style={{ fontFamily: X_FONT, color: "#536471" }}>
            © 2026 X Corp.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
