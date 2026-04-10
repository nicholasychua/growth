"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";

function GoogleIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function XIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function EmailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const secondary =
  "flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border border-white/[0.12] text-[13px] font-medium text-white/80 transition-colors hover:border-white/20 hover:bg-white/[0.04] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25";

const ERROR_MESSAGES: Record<string, string> = {
  access_denied: "Access was denied by X. Please try again.",
  invalid_state: "Authentication session expired. Please try again.",
  token_failed: "Failed to connect with X. Please try again.",
  user_failed: "Could not fetch your X profile. Please try again.",
};

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#141414] px-6 font-sans text-white antialiased">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[340px]"
      >
        <h1 className="mb-8 text-center text-[1.35rem] font-normal tracking-tight text-white">
          Log into your account
        </h1>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-center text-[13px] text-red-400"
          >
            {ERROR_MESSAGES[error] ?? "Something went wrong. Please try again."}
          </motion.div>
        )}

        <a
          href="/api/auth/x"
          className="flex h-11 w-full items-center justify-center gap-2.5 rounded-lg bg-white text-[13px] font-medium text-black transition-colors hover:bg-white/90 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
        >
          <XIcon />
          Login with X
        </a>

        <div className="my-3.5 flex justify-center">
          <div className="w-3/4 border-t border-white/[0.15]" />
        </div>

        <div className="flex flex-col gap-2.5">
          <button type="button" className={secondary}>
            <GoogleIcon />
            Login with Google
          </button>
          <button type="button" className={secondary} onClick={() => router.push("/dashboard")}>
            <EmailIcon />
            Login with Email
          </button>
        </div>

        <p className="mt-8 text-center text-[12px] leading-relaxed text-neutral-500">
          Don&apos;t have an account?{" "}
          <a
            href="#"
            className="text-white font-medium underline-offset-4 hover:underline"
          >
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
