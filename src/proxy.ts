import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Run proxy ONLY on real page navigations.
     * Exclude: API routes, auth callbacks, all Next internals (_next/*),
     * and static assets. This keeps the proxy bundle small and
     * avoids recompiling / re-running on HMR, source maps, and assets.
     */
    "/((?!api|auth|_next|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|woff|woff2|ttf|otf)$).*)",
  ],
};
