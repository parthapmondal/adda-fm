export type VideoMeta = {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
};

const cache = new Map<string, VideoMeta>();
const inflight = new Map<string, Promise<VideoMeta>>();

function fallbackMeta(id: string): VideoMeta {
  return {
    id,
    title: "\u0985\u099c\u09be\u09a8\u09be \u0997\u09be\u09a8", // "অজানা গান" — unknown song
    author: "",
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  };
}

/**
 * Fetches title/author/thumbnail for a single video via YouTube's public
 * oEmbed endpoint. No API key required, works for any public/unlisted
 * video. Falls back to a generic label if the video is private/removed
 * or the request fails.
 */
export async function fetchVideoMeta(id: string): Promise<VideoMeta> {
  if (cache.has(id)) return cache.get(id)!;
  if (inflight.has(id)) return inflight.get(id)!;

  const promise = (async () => {
    try {
      const res = await fetch(
        `https://www.youtube.com/oembed?url=${encodeURIComponent(
          `https://www.youtube.com/watch?v=${id}`
        )}&format=json`
      );
      if (!res.ok) throw new Error("oembed failed");
      const data = await res.json();
      const meta: VideoMeta = {
        id,
        title: data.title || fallbackMeta(id).title,
        author: data.author_name || "",
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      };
      cache.set(id, meta);
      return meta;
    } catch {
      const meta = fallbackMeta(id);
      cache.set(id, meta);
      return meta;
    } finally {
      inflight.delete(id);
    }
  })();

  inflight.set(id, promise);
  return promise;
}

/**
 * Fetches metadata for many videos with a small concurrency cap, so a
 * long playlist doesn't fire 50+ simultaneous requests. Calls onEach
 * as each result resolves, so a UI can render progressively.
 */
export async function fetchPlaylistMeta(
  ids: string[],
  onEach: (meta: VideoMeta) => void,
  concurrency = 6
) {
  let cursor = 0;
  async function worker() {
    while (cursor < ids.length) {
      const id = ids[cursor++];
      const meta = await fetchVideoMeta(id);
      onEach(meta);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, ids.length) }, worker)
  );
}
