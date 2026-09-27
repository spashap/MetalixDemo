import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, locales, type Locale } from "@/content/locales";

// "/" → the visitor's language: remembered choice first, then the browser's
// Accept-Language, then English.
function pickLocale(req: NextRequest): Locale {
  const saved = req.cookies.get("lang")?.value;
  if (saved && hasLocale(saved)) return saved;
  const header = req.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { base: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { base } of ranked) if ((locales as readonly string[]).includes(base)) return base as Locale;
  return defaultLocale;
}

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = `/${pickLocale(req)}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/"] };
