import { NextRequest, NextResponse } from "next/server";

// This route needs a live backend, so it only works on a normal Next.js
// deploy (Vercel) — NOT on the GitHub Pages static export. The GitHub
// Actions workflow (.github/workflows/deploy.yml) removes app/api/
// before that build, since a static export can't include a route that
// reads a request body.
export const dynamic = "force-dynamic";

// Different Redis-on-Vercel setups name these env vars differently
// depending on how you connected the store — Vercel's own KV/Redis
// integration typically uses KV_REST_API_URL / KV_REST_API_TOKEN;
// a raw Upstash connection uses UPSTASH_REDIS_REST_URL /
// UPSTASH_REDIS_REST_TOKEN. Check both so this works either way.
const REDIS_URL =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const PRESENCE_KEY = "adda-fm:presence";
// A tab counts as "online" for this long after its last heartbeat.
const TTL_MS = 45_000;

export async function POST(req: NextRequest) {
  // Not configured yet (no Redis env vars found) — respond with a
  // null count rather than an error, so the client just hides the badge.
  if (!REDIS_URL || !REDIS_TOKEN) {
    return NextResponse.json({ count: null });
  }

  let id: string | undefined;
  try {
    const body = await req.json();
    id = body?.id;
  } catch {
    // ignore, handled below
  }
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "missing id" }, { status: 400 });
  }

  const now = Date.now();
  const cutoff = now - TTL_MS;

  // One pipelined request: record this heartbeat, drop stale entries,
  // then count what's left. The REST API accepts an array of Redis
  // commands as a single pipeline call.
  const pipeline = [
    ["ZADD", PRESENCE_KEY, String(now), id],
    ["ZREMRANGEBYSCORE", PRESENCE_KEY, "-inf", String(cutoff)],
    ["ZCARD", PRESENCE_KEY],
  ];

  try {
    const res = await fetch(`${REDIS_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pipeline),
      cache: "no-store",
    });
    if (!res.ok) throw new Error("redis request failed");
    const data = await res.json();
    const count = typeof data?.[2]?.result === "number" ? data[2].result : null;
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: null });
  }
}
