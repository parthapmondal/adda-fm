"use client";

import { useEffect, useRef, useState } from "react";
import PlaylistMenu from "@/components/PlaylistMenu";
import { fetchVideoMeta, fetchPlaylistMeta, type VideoMeta } from "@/lib/youtubeMeta";

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

// Bengali digits, for the song-count readout ("১২ / ৫৪").
const BN_DIGITS = ["\u09e6","\u09e7","\u09e8","\u09e9","\u09ea","\u09eb","\u09ec","\u09ed","\u09ee","\u09ef"];
function toBengaliNumber(n: number) {
  return String(n)
    .split("")
    .map((c) => (/[0-9]/.test(c) ? BN_DIGITS[Number(c)] : c))
    .join("");
}

// How long to show an error before auto-skipping to the next track.
// Keeps a long playlist from getting stuck on one unavailable video.
const ERROR_SKIP_DELAY_MS = 1800;
const DEFAULT_VOLUME = 80;

type Props = {
  playlistId: string;
  mountId: string;
};

export default function Player({ playlistId, mountId }: Props) {
  const playerRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);
  const errorSkipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const volumeWrapRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [currentMeta, setCurrentMeta] = useState<VideoMeta | null>(null);
  const [songIndex, setSongIndex] = useState<number | null>(null);
  const [songTotal, setSongTotal] = useState<number | null>(null);

  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [muted, setMuted] = useState(false);
  const [volumeOpen, setVolumeOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [videoIds, setVideoIds] = useState<string[]>([]);
  const [metaById, setMetaById] = useState<Record<string, VideoMeta>>({});
  const listFetchedRef = useRef(false);

  const refreshCurrentMeta = () => {
    const p = playerRef.current;
    if (!p || !p.getVideoData) return;
    const data = p.getVideoData();
    const id = data?.video_id;
    if (id) {
      fetchVideoMeta(id).then((meta) => {
        setCurrentMeta(meta);
        setMetaById((prev) => (prev[id] ? prev : { ...prev, [id]: meta }));
      });
    }
    if (p.getPlaylistIndex && p.getPlaylist) {
      const idx = p.getPlaylistIndex();
      const list = p.getPlaylist();
      if (typeof idx === "number" && idx >= 0) setSongIndex(idx + 1);
      if (Array.isArray(list) && list.length > 0) setSongTotal(list.length);
    }
  };

  useEffect(() => {
    let cancelled = false;
    setError(null);
    setCurrentMeta(null);
    setSongIndex(null);
    setSongTotal(null);
    setVideoIds([]);
    setMetaById({});
    listFetchedRef.current = false;

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
          onReady: (e: any) => {
            setReady(true);
            e.target.setLoop(loop);
            e.target.setShuffle(shuffle);
            e.target.setVolume(volume);
          },
          onStateChange: (e: any) => {
            // -1 unstarted, 0 ended, 1 playing, 2 paused, 3 buffering, 5 cued
            setPlaying(e.data === 1);
            if (e.data === 1 || e.data === 5 || e.data === 3) {
              if (errorSkipTimer.current) {
                clearTimeout(errorSkipTimer.current);
                errorSkipTimer.current = null;
              }
              setError(null);
              refreshCurrentMeta();
            }
          },
          onError: (e: any) => {
            // 2 = bad param/ID, 100 = not found/private, 101/150 = embedding blocked
            const messages: Record<number, string> = {
              2: "\u09aa\u09cd\u09b2\u09c7\u09b2\u09bf\u09b8\u09cd\u099f \u0986\u0987\u09a1\u09bf \u09ad\u09c1\u09b2 \u2014 data/playlists.ts \u098f \u0986\u09b8\u09b2 ID \u09ac\u09b8\u09be\u09a8\u0964",
              100: "\u098f\u0987 \u0997\u09be\u09a8\u099f\u09bf \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf \u2014 \u09aa\u09b0\u09c7\u09b0\u099f\u09be \u098f\u0997\u09bf\u09af\u09bc\u09c7 \u09af\u09be\u0993\u09af\u09bc\u09be \u09b9\u099a\u09cd\u099b\u09c7\u2026",
              101: "\u098f\u0987 \u0997\u09be\u09a8\u099f\u09bf \u098f\u09ae\u09ac\u09c7\u09a1 \u0995\u09b0\u09be \u09af\u09be\u09af\u09bc \u09a8\u09be \u2014 \u09aa\u09b0\u09c7\u09b0\u099f\u09be \u098f\u0997\u09bf\u09af\u09bc\u09c7 \u09af\u09be\u0993\u09af\u09bc\u09be \u09b9\u099a\u09cd\u099b\u09c7\u2026",
              150: "\u098f\u0987 \u0997\u09be\u09a8\u099f\u09bf \u098f\u09ae\u09ac\u09c7\u09a1 \u0995\u09b0\u09be \u09af\u09be\u09af\u09bc \u09a8\u09be \u2014 \u09aa\u09b0\u09c7\u09b0\u099f\u09be \u098f\u0997\u09bf\u09af\u09bc\u09c7 \u09af\u09be\u0993\u09af\u09bc\u09be \u09b9\u099a\u09cd\u099b\u09c7\u2026",
            };
            setError(
              messages[e.data] ||
                "\u098f\u0987 \u0997\u09be\u09a8\u099f\u09bf \u09b2\u09cb\u09a1 \u0995\u09b0\u09a4\u09c7 \u09b8\u09ae\u09b8\u09cd\u09af\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7 \u2014 \u09aa\u09b0\u09c7\u09b0\u099f\u09be \u098f\u0997\u09bf\u09af\u09bc\u09c7 \u09af\u09be\u0993\u09af\u09bc\u09be \u09b9\u099a\u09cd\u099b\u09c7\u2026"
            );
            // Auto-skip past unavailable/restricted videos instead of
            // getting stuck — this is what causes the "glitch" on long
            // playlists that include even one blocked/private video.
            if (errorSkipTimer.current) clearTimeout(errorSkipTimer.current);
            errorSkipTimer.current = setTimeout(() => {
              playerRef.current?.nextVideo?.();
            }, ERROR_SKIP_DELAY_MS);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (errorSkipTimer.current) clearTimeout(errorSkipTimer.current);
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

  const toggleLoop = () => {
    const next = !loop;
    setLoop(next);
    playerRef.current?.setLoop?.(next);
  };

  const toggleShuffle = () => {
    const next = !shuffle;
    setShuffle(next);
    playerRef.current?.setShuffle?.(next);
  };

  const changeVolume = (value: number) => {
    setVolume(value);
    playerRef.current?.setVolume?.(value);
    if (value > 0 && muted) {
      setMuted(false);
      playerRef.current?.unMute?.();
    }
  };

  const toggleMute = () => {
    const p = playerRef.current;
    if (!p) return;
    if (muted) {
      p.unMute?.();
      setMuted(false);
    } else {
      p.mute?.();
      setMuted(true);
    }
  };

  const onSeek = (value: number) => {
    setCurrent(value);
  };

  const commitSeek = (value: number) => {
    playerRef.current?.seekTo?.(value, true);
    setSeeking(false);
  };

  const openMenu = () => {
    setMenuOpen(true);
    if (listFetchedRef.current) return;
    const p = playerRef.current;
    if (!p || !p.getPlaylist) return;
    const ids: string[] = p.getPlaylist() || [];
    if (ids.length === 0) return;
    listFetchedRef.current = true;
    setVideoIds(ids);
    fetchPlaylistMeta(ids, (meta) => {
      setMetaById((prev) => ({ ...prev, [meta.id]: meta }));
    });
  };

  const pickSong = (index: number) => {
    playerRef.current?.playVideoAt?.(index);
    setMenuOpen(false);
  };

  // Keyboard shortcuts: space play/pause, ←/→ prev/next, ↑/↓ volume,
  // M mute, L loop, S shuffle, Esc closes the song list.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        return;
      }
      switch (e.key) {
        case " ":
          e.preventDefault();
          toggle();
          break;
        case "ArrowRight":
          e.preventDefault();
          skip(1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          skip(-1);
          break;
        case "ArrowUp":
          e.preventDefault();
          changeVolume(Math.min(100, volume + 5));
          break;
        case "ArrowDown":
          e.preventDefault();
          changeVolume(Math.max(0, volume - 5));
          break;
        case "m":
        case "M":
          toggleMute();
          break;
        case "l":
        case "L":
          toggleLoop();
          break;
        case "s":
        case "S":
          toggleShuffle();
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, volume, muted, loop, shuffle, menuOpen]);

  // Close the volume popover on outside click.
  useEffect(() => {
    if (!volumeOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!volumeWrapRef.current?.contains(e.target as Node)) {
        setVolumeOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [volumeOpen]);

  return (
    <>
      <div className="player">
        <div id={mountId} className="yt-mount" />
        <div className="player__disc" data-playing={playing} aria-hidden="true">
          <DiscArt thumbnail={currentMeta?.thumbnail} />
        </div>
        <div className="player__mid">
          {error ? (
            <p className="player__error">{error}</p>
          ) : (
            <>
              {(currentMeta?.title || songTotal) && (
                <div className="player__nowplaying">
                  <span className="player__song">
                    {currentMeta?.title}
                    {currentMeta?.author ? (
                      <span className="player__artist-inline"> \u2014 {currentMeta.author}</span>
                    ) : null}
                  </span>
                  {songIndex && songTotal && (
                    <span className="player__count">
                      {toBengaliNumber(songIndex)} / {toBengaliNumber(songTotal)}
                    </span>
                  )}
                </div>
              )}
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
          <button className="player__btn" onClick={() => skip(-1)} aria-label="Previous" title="Previous (\u2190)">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
              <path d="M6 6h2v12H6zM20 6L9 12l11 6z" />
            </svg>
          </button>
          <button className="player__btn player__btn--play" onClick={toggle} aria-label="Play/Pause" title="Play/Pause (Space)">
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
          <button className="player__btn" onClick={() => skip(1)} aria-label="Next" title="Next (\u2192)">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
              <path d="M16 6h2v12h-2zM4 6l11 6-11 6z" />
            </svg>
          </button>
          <button
            className="player__btn player__btn--toggle"
            data-on={shuffle}
            onClick={toggleShuffle}
            aria-label="Shuffle"
            title="Shuffle (S)"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
              <path d="M4 6h3.5l9 12H20M4 18h3.5l2.2-2.9M15 6h5v0M17.5 8.5 20 6l-2.5-2.5M17.5 15.5 20 18l-2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            className="player__btn player__btn--toggle"
            data-on={loop}
            onClick={toggleLoop}
            aria-label="Loop all"
            title="Loop all (L)"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
              <path
                d="M4 12a8 8 0 0 1 14-5M20 12a8 8 0 0 1-14 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="M17 4v3.5H13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 20v-3.5h3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="player__volume" ref={volumeWrapRef}>
            <button
              className="player__btn"
              onClick={() => setVolumeOpen((v) => !v)}
              aria-label="Volume"
              title="Volume (M mute)"
            >
              {muted || volume === 0 ? (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                  <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
                  <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                  <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
                  <path d="M16.5 9a4 4 0 0 1 0 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M18.5 7a7 7 0 0 1 0 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
                </svg>
              )}
            </button>
            {volumeOpen && (
              <div className="player__volume-pop">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={muted ? 0 : volume}
                  onChange={(e) => changeVolume(Number(e.target.value))}
                  aria-label="Volume level"
                />
              </div>
            )}
          </div>
          <button
            className="player__btn"
            onClick={openMenu}
            aria-label="Song list"
            title="Song list"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
              <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <PlaylistMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        videoIds={videoIds}
        metaById={metaById}
        currentId={currentMeta?.id ?? null}
        onPick={pickSong}
      />
    </>
  );
}

function DiscArt({ thumbnail }: { thumbnail?: string }) {
  if (thumbnail) {
    return (
      <div
        className="player__disc-art"
        style={{ backgroundImage: `url(${thumbnail})` }}
      >
        <span className="player__disc-hole" />
      </div>
    );
  }
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
