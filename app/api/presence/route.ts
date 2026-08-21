import { NextRequest, NextResponse } from "next/server";

// This route needs a live backend, so it only works on a normal Next.js
// deploy (Vercel) — NOT on the GitHub Pages static export. The GitHub
// Actions workflow (.github/workflows/deploy.yml) removes app/api/
// before that build, since a static export can't include a route that
// reads a request body.
export const dynamic = "force-dynamic";

const PRESENCE_KEY = "adda-fm:presence";
// A tab counts as "online" for this long after its last heartbeat.
const TTL_MS = 45_000;

// --- Path A: REST-based Redis (Vercel's old KV product, or a raw
// Upstash REST connection). Talks over plain fetch(). ---
const REST_URL =
  process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

// --- Path B: raw redis:// connection string — this is what Redis
// Cloud (via Vercel's Marketplace "Redis" storage) actually gives you.
// Vercel prefixes it with your store's name (e.g.
// "addafmstorage_REDIS_URL"), so check the plain name first, then
// this project's specific one, in case the store gets renamed later. ---
const RAW_REDIS_URL =
  process.env.REDIS_URL || process.env.addafmstorage_REDIS_URL;

async function countViaRest(id: string, now: number, cutoff: number) {
  const pipeline = [
    ["ZADD", PRESENCE_KEY, String(now), id],
    ["ZREMRANGEBYSCORE", PRESENCE_KEY, "-inf", String(cutoff)],
    ["ZCARD", PRESENCE_KEY],
  ];
  const res = await fetch(`${REST_URL}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pipeline),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("redis rest request failed");
  const data = await res.json();
  return typeof data?.[2]?.result === "number" ? data[2].result : null;
}

// Reused across invocations on a warm serverless instance instead of
// opening a fresh TCP connection on every single request.
let ioredisClient: import("ioredis").Redis | null = null;

async function countViaRaw(id: string, now: number, cutoff: number) {
  const { default: Redis } = await import("ioredis");
  if (!ioredisClient) {
    ioredisClient = new Redis(RAW_REDIS_URL as string, {
      maxRetriesPerRequest: 1,
      connectTimeout: 3000,
    });
    ioredisClient.on("error", () => {
      // Swallowed here — a failed command still rejects below, which
      // the outer try/catch in POST() handles.
    });
  }
  const pipeline = ioredisClient.pipeline();
  pipeline.zadd(PRESENCE_KEY, now, id);
  pipeline.zremrangebyscore(PRESENCE_KEY, "-inf", cutoff);
  pipeline.zcard(PRESENCE_KEY);
  const results = await pipeline.exec();
  const count = results?.[2]?.[1];
  return typeof count === "number" ? count : null;
}

export async function POST(req: NextRequest) {
  let id: string | undefined;
  try {
    const body = await req.json();
    id = body?.id;
  } catch {
    // handled below
  }
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "missing id" }, { status: 400 });
  }

  const now = Date.now();
  const cutoff = now - TTL_MS;

  try {
    let count: number | null = null;
    if (REST_URL && REST_TOKEN) {
      count = await countViaRest(id, now, cutoff);
    } else if (RAW_REDIS_URL) {
      count = await countViaRaw(id, now, cutoff);
    }
    // Neither pair configured — count stays null, client hides the badge.
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: null });
  }
}
