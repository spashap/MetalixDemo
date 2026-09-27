import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";

// Page-view counter for the footer. Every page load POSTs once:
//   views:total    — INCR, every load counts
//   views:visitors — SET of visitor ids (cookie), its size = unique visitors
// Without the Upstash env vars (e.g. local dev without `vercel env pull`) it
// answers 204 and the footer simply shows nothing.

const KEY_TOTAL = "views:total";
const KEY_VISITORS = "views:visitors";
const COOKIE = "vid";
const BOTS = /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|embedly|vercel-screenshot/i;

let redis: Redis | null | undefined;
function getRedis() {
  if (redis === undefined) {
    const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
    redis = url && token ? new Redis({ url, token }) : null;
  }
  return redis;
}

export async function POST(req: Request) {
  const db = getRedis();
  if (!db) return new Response(null, { status: 204 });

  const jar = await cookies();
  let vid = jar.get(COOKIE)?.value;
  if (!vid || !/^[\w-]{8,64}$/.test(vid)) {
    vid = crypto.randomUUID();
    jar.set(COOKIE, vid, { maxAge: 60 * 60 * 24 * 365 * 2, httpOnly: true, sameSite: "lax", secure: true, path: "/" });
  }

  try {
    const isBot = BOTS.test(req.headers.get("user-agent") ?? "");
    const p = db.pipeline();
    if (isBot) p.get<number>(KEY_TOTAL);
    else p.incr(KEY_TOTAL).sadd(KEY_VISITORS, vid);
    p.scard(KEY_VISITORS);
    const res = await p.exec<[number | null, ...unknown[]]>();
    const total = Number(res[0] ?? 0);
    const unique = Number(res[res.length - 1] ?? 0);
    return Response.json({ total, unique }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return new Response(null, { status: 204 });
  }
}
