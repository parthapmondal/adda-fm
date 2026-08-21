"use client";

import { useEffect, useRef, useState } from "react";

const BN_DIGITS = ["\u09e6", "\u09e7", "\u09e8", "\u09e9", "\u09ea", "\u09eb", "\u09ec", "\u09ed", "\u09ee", "\u09ef"];
function toBengaliNumber(n: number) {
  return String(n)
    .split("")
    .map((c) => (/[0-9]/.test(c) ? BN_DIGITS[Number(c)] : c))
    .join("");
}

// Send a heartbeat this often. Must stay comfortably under the
// server's TTL_MS (45s) so a tab doesn't fall off between beats.
const HEARTBEAT_MS = 20_000;

export default function OnlineCounter() {
  const [count, setCount] = useState<number | null>(null);
  const idRef = useRef<string>("");

  useEffect(() => {
    if (!idRef.current) {
      idRef.current =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`;
    }
    let cancelled = false;

    const beat = async () => {
      try {
        const res = await fetch("/api/presence", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: idRef.current }),
        });
        if (!res.ok) throw new Error("bad response");
        const data = await res.json();
        if (!cancelled) {
          setCount(typeof data.count === "number" ? data.count : null);
        }
      } catch {
        // Route missing (GitHub Pages export) or not configured yet —
        // just stay hidden rather than showing broken data.
        if (!cancelled) setCount(null);
      }
    };

    beat();
    const interval = setInterval(beat, HEARTBEAT_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (count === null || count < 1) return null;

  return (
    <div
      className="online-badge"
      title={`${toBengaliNumber(count)} \u099c\u09a8 \u098f\u0996\u09a8 \u09b6\u09c1\u09a8\u099b\u09c7\u09a8`}
    >
      <span className="online-badge__dot" aria-hidden="true" />
      {toBengaliNumber(count)}
    </div>
  );
}
