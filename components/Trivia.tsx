"use client";

import { useState } from "react";
import type { Trivia } from "@/data/genres";

type Props = {
  items: Trivia[];
};

export default function TriviaStrip({ items }: Props) {
  const [index, setIndex] = useState(0);
  const current = items[index];

  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  return (
    <div className="trivia">
      <button className="trivia__nav" onClick={prev} aria-label="Previous trivia">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
          <path
            d="M15 5l-7 7 7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="trivia__body">
        <p className="trivia__bn">{current.bn}</p>
        <p className="trivia__en">{current.en}</p>
      </div>
      <button className="trivia__nav" onClick={next} aria-label="Next trivia">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
          <path
            d="M9 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
