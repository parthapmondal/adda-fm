// Get each playlist ID from the PLAYLIST's own page
// (youtube.com/playlist?list=...), not a "watch a video that happens
// to be in a playlist" URL — those can show a shortened/different
// list= value. Normal IDs are ~34 characters. Playlist must be Public
// or Unlisted (not Private) or it will fail to embed.
export type Genre = {
  slug: string;
  label: string;
  bgImage: string;
  accent: string;
  accentSoft: string;
  playlist: { id: string; url: string };
};

export const genres: Genre[] = [
  {
    slug: "90s-classics",
    label: "90s Classics",
    bgImage: "/images/bg-90sclassic-day.png",
    accent: "#e8a33d",
    accentSoft: "rgba(232, 163, 61, 0.35)",
    playlist: {
      id: "PLCgxL-yH0JcM",
      url: "https://youtube.com/playlist?list=PLCgxL-yH0JcM",
    },
  },
  {
    slug: "bangla-band",
    label: "\u09ac\u09be\u0982\u09b2\u09be \u09ac\u09cd\u09af\u09be\u09a8\u09cd\u09a1",
    bgImage: "/images/bg-bangla-band.png",
    accent: "#55c2ba",
    accentSoft: "rgba(85, 194, 186, 0.35)",
    playlist: {
      id: "PLehjuCKQdN-c",
      url: "https://youtube.com/playlist?list=PLehjuCKQdN-c",
    },
  },
  {
    slug: "retro",
    label: "Retro",
    bgImage: "/images/bg-retro-night.png",
    accent: "#c2665a",
    accentSoft: "rgba(194, 102, 90, 0.35)",
    playlist: {
      id: "PLARCYH-FMBko",
      url: "https://youtube.com/playlist?list=PLARCYH-FMBko",
    },
  },
  {
    slug: "folk",
    label: "Folk",
    bgImage: "/images/bg-folk-baul.png",
    accent: "#7fa05a",
    accentSoft: "rgba(127, 160, 90, 0.35)",
    playlist: {
      id: "PLUEwN0BL8Ijw",
      url: "https://youtube.com/playlist?list=PLUEwN0BL8Ijw",
    },
  },
  {
    slug: "pujo",
    label: "Pujo",
    bgImage: "/images/bg-retro.png",
    accent: "#c0392b",
    accentSoft: "rgba(192, 57, 43, 0.35)",
    playlist: {
      id: "PLO8Mixo4YWYc",
      url: "https://youtube.com/playlist?list=PLO8Mixo4YWYc",
    },
  },
];
