"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

let apiPromise: Promise<void> | null = null;

function loadYouTubeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return apiPromise;
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type Props = {
  playlistId: string;
  mountId: string;
};

export default function Player({ playlistId, mountId }: Props) {
  const playerRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);

    loadYouTubeApi().then(() => {
      if (cancelled) return;
      playerRef.current = new window.YT.Player(mountId, {
        height: "1",
        width: "1",
        playerVars: {
          listType: "playlist",
          list: playlistId,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: () => setReady(true),
          onStateChange: (e: any) => {
            // 1 = playing, 2 = paused
            setPlaying(e.data === 1);
          },
          onError: (e: any) => {
            // 2 = bad param/ID, 100 = not found/private, 101/150 = embedding blocked
            const messages: Record<number, string> = {
              2: "\u09aa\u09cd\u09b2\u09c7\u09b2\u09bf\u09b8\u09cd\u099f \u0986\u0987\u09a1\u09bf \u09ad\u09c1\u09b2 \u2014 data/playlists.ts \u098f \u0986\u09b8\u09b2 ID \u09ac\u09b8\u09be\u09a8\u0964",
              100: "\u098f\u0987 \u09aa\u09cd\u09b2\u09c7\u09b2\u09bf\u09b8\u09cd\u099f \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf \u2014 \u09b9\u09af\u09bc\u09a4 Private \u0986\u099b\u09c7\u0964",
              101: "\u098f\u0987 \u09aa\u09cd\u09b2\u09c7\u09b2\u09bf\u09b8\u09cd\u099f\u09c7\u09b0 \u0997\u09be\u09a8 \u098f\u09ae\u09ac\u09c7\u09a1 \u0995\u09b0\u09be \u09af\u09be\u09a8 \u09a8\u09be\u0964",
              150: "\u098f\u0987 \u09aa\u09cd\u09b2\u09c7\u09b2\u09bf\u09b8\u09cd\u099f\u09c7\u09b0 \u0997\u09be\u09a8 \u098f\u09ae\u09ac\u09c7\u09a1 \u0995\u09b0\u09be \u09af\u09be\u09a8 \u09a8\u09be\u0964",
            };
            setError(
              messages[e.data] ||
                "\u09aa\u09cd\u09b2\u09c7\u09b2\u09bf\u09b8\u09cd\u099f \u09b2\u09cb\u09a1 \u0995\u09b0\u09a4\u09c7 \u09b8\u09ae\u09b8\u09cd\u09af\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964"
            );
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      playerRef.current?.destroy?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistId]);

  useEffect(() => {
    const tick = () => {
      const p = playerRef.current;
      if (p && p.getCurrentTime && !seeking) {
        setCurrent(p.getCurrentTime() || 0);
        setDuration(p.getDuration() || 0);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [seeking]);

  const toggle = () => {
    const p = playerRef.current;
    if (!p) return;
    if (playing) p.pauseVideo();
    else p.playVideo();
  };

  const skip = (dir: 1 | -1) => {
    const p = playerRef.current;
    if (!p) return;
    if (dir === 1) p.nextVideo();
    else p.previousVideo();
  };

  const onSeek = (value: number) => {
    setCurrent(value);
  };

  const commitSeek = (value: number) => {
    playerRef.current?.seekTo?.(value, true);
    setSeeking(false);
  };

  return (
    <div className="player">
      <div id={mountId} className="yt-mount" />
      <div className="player__disc" data-playing={playing} aria-hidden="true">
        <DiscArt />
      </div>
      <div className="player__mid">
        {error ? (
          <p className="player__error">{error}</p>
        ) : (
          <>
            <input
              className="player__seek"
              type="range"
              min={0}
              max={duration || 0}
              step={1}
              value={current}
              onChange={(e) => {
                setSeeking(true);
                onSeek(Number(e.target.value));
              }}
              onMouseUp={(e) => commitSeek(Number((e.target as HTMLInputElement).value))}
              onTouchEnd={(e) => commitSeek(Number((e.target as HTMLInputElement).value))}
              disabled={!ready}
            />
            <div className="player__times">
              <span>{formatTime(current)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </>
        )}
      </div>
      <div className="player__controls">
        <button className="player__btn" onClick={() => skip(-1)} aria-label="Previous">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M6 6h2v12H6zM20 6L9 12l11 6z" />
          </svg>
        </button>
        <button className="player__btn player__btn--play" onClick={toggle} aria-label="Play/Pause">
          {playing ? (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M8 5l12 7-12 7z" />
            </svg>
          )}
        </button>
        <button className="player__btn" onClick={() => skip(1)} aria-label="Next">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M16 6h2v12h-2zM4 6l11 6-11 6z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function DiscArt() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx="50" cy="50" r="49" fill="#161513" stroke="rgba(244,238,224,0.25)" strokeWidth="1" />
      <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(244,238,224,0.1)" strokeWidth="1" />
      <circle cx="50" cy="50" r="26" fill="none" stroke="rgba(244,238,224,0.08)" strokeWidth="1" />
      <circle cx="50" cy="50" r="16" fill="var(--accent)" opacity="0.85" />
      <circle cx="50" cy="50" r="3" fill="#161513" />
    </svg>
  );
}
