"use client";

import type { VideoMeta } from "@/lib/youtubeMeta";

type Props = {
  open: boolean;
  onClose: () => void;
  videoIds: string[];
  metaById: Record<string, VideoMeta>;
  currentId: string | null;
  onPick: (index: number) => void;
};

export default function PlaylistMenu({
  open,
  onClose,
  videoIds,
  metaById,
  currentId,
  onPick,
}: Props) {
  return (
    <>
      <div
        className="menu-scrim"
        data-open={open}
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="menu-panel" data-open={open} role="dialog" aria-label="Playlist">
        <div className="menu-panel__head">
          <span>{"\u0997\u09be\u09a8\u09c7\u09b0 \u09a4\u09be\u09b2\u09bf\u0995\u09be"}</span>
          <button className="menu-panel__close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="menu-panel__list">
          {videoIds.length === 0 && (
            <p className="menu-panel__empty">
              {"\u09aa\u09cd\u09b2\u09c7\u09b2\u09bf\u09b8\u09cd\u099f \u09b2\u09cb\u09a1 \u09b9\u099a\u09cd\u099b\u09c7\u2026"}
            </p>
          )}
          {videoIds.map((id, i) => {
            const meta = metaById[id];
            const active = id === currentId;
            return (
              <button
                key={`${id}-${i}`}
                className="menu-row"
                data-active={active}
                onClick={() => onPick(i)}
              >
                <span className="menu-row__thumb">
                  {meta ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={meta.thumbnail} alt="" />
                  ) : (
                    <span className="menu-row__thumb-skeleton" />
                  )}
                </span>
                <span className="menu-row__text">
                  <span className="menu-row__title">
                    {meta ? meta.title : "\u2026"}
                  </span>
                  {meta?.author && (
                    <span className="menu-row__author">{meta.author}</span>
                  )}
                </span>
                {active && <span className="menu-row__playing">{"\u266a"}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
