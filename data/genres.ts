// Get each playlist ID from the PLAYLIST's own page
// (youtube.com/playlist?list=...), not a "watch a video that happens
// to be in a playlist" URL — those can show a shortened/different
// list= value. Normal IDs are ~34 characters. Playlist must be Public
// or Unlisted (not Private) or it will fail to embed.
export type Trivia = { bn: string; en: string };

export type Genre = {
  slug: string;
  label: string;
  bgImage: string;
  accent: string;
  accentSoft: string;
  playlist: { id: string; url: string };
  trivia: Trivia[];
};

export const genres: Genre[] = [
  {
    slug: "90s-classics",
    label: "90s Classics",
    bgImage: "/images/bg-90s-classics.png",
    accent: "#e8a33d",
    accentSoft: "rgba(232, 163, 61, 0.35)",
    playlist: {
      id: "PLCgxL-yH0JcM",
      url: "https://music.youtube.com/playlist?list=PLCgxL-yH0JcM",
    },
    trivia: [
{
    bn: "\u201c\u099c\u09c0\u09ac\u09a8\u09ae\u09c1\u0996\u09c0\u201d \u09b6\u09ac\u09cd\u09a6\u099f\u09be \u09aa\u09cd\u09b0\u09a5\u09ae \u09ac\u09cd\u09af\u09ac\u09b9\u09c3\u09a4 \u09b9\u09af\u09bc \u09e7\u09ef\u09ef\u09e9 \u09b8\u09be\u09b2\u09c7, \u09a8\u099a\u09bf\u0995\u09c7\u09a4\u09be\u09b0 \u098f\u0995\u099f\u09bf \u0985\u09cd\u09af\u09be\u09b2\u09ac\u09be\u09ae\u09c7\u09b0 HMV \u09ac\u09bf\u099c\u09cd\u099e\u09be\u09aa\u09a8\u09c7\u0964",
    en: 'The term "jibanmukhi" first appeared in 1993, in HMV\u2019s marketing for a Nachiketa album.',
  },
{
    bn: "\u0995\u09ac\u09c0\u09b0 \u09b8\u09c1\u09ae\u09a8\u09c7\u09b0 \u09aa\u09cd\u09b0\u09a5\u09ae \u0985\u09cd\u09af\u09be\u09b2\u09ac\u09be\u09ae \u2018\u09a4\u09cb\u09ae\u09be\u0995\u09c7 \u099a\u09be\u0987\u2019 \u09aa\u09cd\u09b0\u0995\u09be\u09b6 \u09aa\u09be\u09af\u09bc \u09e7\u09ef\u09ef\u09e8 \u09b8\u09be\u09b2\u09c7 \u2014 \u098f\u0996\u09be\u09a8 \u09a5\u09c7\u0995\u09c7\u0987 \u09ac\u09be\u0982\u09b2\u09be \u0997\u09be\u09a8\u09c7 \u098f\u0995 \u09a8\u09a4\u09c1\u09a8 \u09af\u09c1\u0997\u09c7\u09b0 \u09b6\u09c1\u09b0\u09c1 \u09ac\u09b2\u09c7 \u09ae\u09a8\u09c7 \u0995\u09b0\u09be \u09b9\u09af\u09bc\u0964",
    en: "Kabir Suman\u2019s debut album Tomake Chai (1992) is widely seen as the spark that lit the jibanmukhi movement.",
  },
{
    bn: "\u0995\u09ac\u09c0\u09b0 \u09b8\u09c1\u09ae\u09a8 \u09a8\u09bf\u099c\u09c7 \u0995\u0996\u09a8\u0993 \u201c\u099c\u09c0\u09ac\u09a8\u09ae\u09c1\u0996\u09c0\u201d \u09a4\u0995\u09ae\u09be\u099f\u09be \u09ae\u09be\u09a8\u09c7\u09a8\u09a8\u09bf \u2014 \u09a4\u09be\u0981\u09b0 \u09ae\u09a4\u09c7 \u098f\u099f\u09be \u09a8\u09bf\u099b\u0995 \u09ac\u09bf\u09aa\u09a3\u09a8\u09c7\u09b0 \u09b6\u09ac\u09cd\u09a6\u0964",
    en: 'Kabir Suman himself rejected the "jibanmukhi" label, calling it a marketing term rather than a real genre.',
  },
{
    bn: "\u0985\u099e\u09cd\u099c\u09a8 \u09a6\u09a4\u09cd\u09a4\u09b0 \u0997\u09be\u09a8\u09c7 \u09ac\u09ac \u09a1\u09bf\u09b2\u09be\u09a8 \u0986\u09b0 \u0995\u09ac\u09c0\u09b0 \u09b8\u09c1\u09ae\u09a8\u09c7\u09b0 \u09aa\u09cd\u09b0\u09ad\u09be\u09ac \u09b8\u09cd\u09aa\u09b7\u09cd\u099f \u2014 \u09b2\u09cb\u0995\u0997\u09be\u09a8\u09c7\u09b0 \u09b8\u09c1\u09b0\u09c7 \u09b6\u09b9\u09c1\u09b0\u09c7 \u09ae\u09a7\u09cd\u09af\u09ac\u09bf\u09a4\u09cd\u09a4 \u099c\u09c0\u09ac\u09a8\u09c7\u09b0 \u0995\u09a5\u09be\u0964",
    en: "Anjan Dutt\u2019s folk-inflected style draws heavily on Bob Dylan and Kabir Suman, chronicling urban middle-class Kolkata life.",
  },
{
    bn: "\u09ae\u09cc\u09b8\u09c1\u09ae\u09c0 \u09ad\u09cc\u09ae\u09bf\u0995 \u098f\u0987 \u0986\u09a8\u09cd\u09a6\u09cb\u09b2\u09a8\u09c7\u09b0 \u098f\u0995\u099f\u09bf \u09aa\u09cd\u09b0\u09a7\u09be\u09a8 \u09a8\u09be\u09b0\u09c0 \u0995\u09a3\u09cd\u09a0\u09b8\u09cd\u09ac\u09b0, \u09af\u09be\u0981\u09b0 \u0997\u09be\u09a8\u09c7 \u09a8\u09be\u09b0\u09c0\u09b0 \u099c\u09c0\u09ac\u09a8 \u0986\u09b0 \u09b8\u09ae\u09be\u099c \u0989\u09a0\u09c7 \u0986\u09b8\u09c7\u0964",
    en: "Moushumi Bhowmik was one of the movement\u2019s key voices, her songs centering women\u2019s lives and social realism.",
  },
{
    bn: "\u098f\u0987 \u0997\u09be\u09a8\u09c7\u09b0 \u09b6\u09bf\u0995\u09a1\u09bc \u0996\u09c1\u0981\u099c\u09a4\u09c7 \u0997\u09c7\u09b2\u09c7 \u09aa\u09cc\u0981\u099b\u09be\u09a4\u09c7 \u09b9\u09af\u09bc \u09e7\u09ef\u09ed\u09e6-\u098f\u09b0 \u09a6\u09b6\u0995\u09c7\u09b0 \u09ae\u09b9\u09c0\u09a8\u09c7\u09b0 \u0998\u09cb\u09dc\u09be\u0997\u09c1\u09b2\u09bf \u09ac\u09cd\u09af\u09be\u09a8\u09cd\u09a1\u09c7, \u09af\u09be\u09a6\u09c7\u09b0 \u0997\u09be\u09a8 \u09a8\u09bf\u09af\u09bc\u09c7 \u09a4\u0996\u09a8 \u09a4\u09c7\u09ae\u09a8 \u0995\u09c7\u0989 \u09ae\u09be\u09a5\u09be \u0998\u09be\u09ae\u09be\u09af\u09bc\u09a8\u09bf\u0964",
    en: "The roots trace back to 1970s band Moheener Ghoraguli \u2014 largely ignored in its own time, later revered as the movement\u2019s precursor.",
  },
{
    bn: "\u099c\u09c0\u09ac\u09a8\u09ae\u09c1\u0996\u09c0 \u0997\u09be\u09a8 \u09ae\u09c2\u09b2\u09a4 \u09aa\u09cd\u09b0\u09a4\u09bf\u09ac\u09be\u09a6\u09c7\u09b0 \u0997\u09be\u09a8 \u2014 \u09b0\u09be\u099c\u09a8\u09c0\u09a4\u09bf, \u09a6\u09be\u09b0\u09bf\u09a6\u09cd\u09b0\u09cd\u09af, \u0995\u09cd\u09b7\u09cb\u09ad, \u09b6\u09b9\u09c1\u09b0\u09c7 \u09af\u09a8\u09cd\u09a4\u09cd\u09b0\u09a3\u09be\u09b0 \u0995\u09a5\u09be \u09ac\u09b2\u09a4 \u098f\u0987 \u0997\u09be\u09a8\u0997\u09c1\u09b2\u09cb\u0964",
    en: "At its core, jibanmukhi music was protest music \u2014 voicing anger, poverty, and the frustrations of urban youth.",
  },
{
    bn: "\u098f\u0987 \u09a7\u09be\u09b0\u09be \u09a4\u09c8\u09b0\u09bf \u09b9\u09af\u09bc\u09c7\u099b\u09bf\u09b2 \u09b0\u09ac\u09c0\u09a8\u09cd\u09a6\u09cd\u09b0\u09b8\u0999\u09cd\u0997\u09c0\u09a4-\u09a8\u09bf\u09b0\u09cd\u09ad\u09b0 \u201c\u0986\u09a7\u09c1\u09a8\u09bf\u0995 \u09ac\u09be\u0982\u09b2\u09be \u0997\u09be\u09a8\u201d-\u098f\u09b0 \u09b0\u09cb\u09ae\u09be\u09a8\u09cd\u099f\u09bf\u0995 \u0998\u09b0\u09be\u09a8\u09be\u09b0 \u09ac\u09bf\u09aa\u09b0\u09c0\u09a4\u09c7\u0964",
    en: 'It positioned itself against the romantic tradition of "adhunik" Bengali songs rooted in Rabindra Sangeet.',
  },
    ],
  },
  {
    slug: "bangla-band",
    label: "\u09ac\u09be\u0982\u09b2\u09be \u09ac\u09cd\u09af\u09be\u09a8\u09cd\u09a1",
    bgImage: "/images/bg-bangla-band.png",
    accent: "#55c2ba",
    accentSoft: "rgba(85, 194, 186, 0.35)",
    playlist: {
      id: "PLehjuCKQdN-c",
      url: "https://music.youtube.com/playlist?list=PLehjuCKQdN-c",
    },
    trivia: [
{
    bn: "\u09ae\u09b9\u09c0\u09a8\u09c7\u09b0 \u0998\u09cb\u09dc\u09be\u0997\u09c1\u09b2\u09bf \u0997\u09dc\u09c7 \u0989\u09a0\u09c7 \u09e7\u09ef\u09ed\u09eb \u09b8\u09be\u09b2\u09c7, \u0997\u09cc\u09a4\u09ae \u099a\u099f\u09cd\u099f\u09cb\u09aa\u09be\u09a7\u09cd\u09af\u09be\u09af\u09bc\u09c7\u09b0 \u09b9\u09be\u09a4 \u09a7\u09b0\u09c7 \u2014 \u09ad\u09be\u09b0\u09a4\u09c7\u09b0 \u09aa\u09cd\u09b0\u09a5\u09ae \u09b0\u0995 \u09ac\u09cd\u09af\u09be\u09a8\u09cd\u09a1 \u09ac\u09b2\u09c7 \u09ae\u09be\u09a8\u09be \u09b9\u09af\u09bc \u098f\u0995\u09c7\u0964",
    en: "Moheener Ghoraguli, formed in 1975 by Gautam Chattopadhyay, is regarded as India\u2019s first rock band.",
  },
{
    bn: "\u09ac\u09cd\u09af\u09be\u09a8\u09cd\u09a1\u099f\u09bf \u09e7\u09ef\u09ee\u09e7 \u09b8\u09be\u09b2\u09c7 \u09ad\u09c7\u0999\u09c7 \u09af\u09be\u09af\u09bc, \u0995\u09bf\u09a8\u09cd\u09a4\u09c1 \u09a4\u09be\u09a6\u09c7\u09b0 \u0997\u09be\u09a8 \u0995\u09b2\u09c7\u099c \u0995\u09cd\u09af\u09be\u09ae\u09cd\u09aa\u09be\u09b8\u09c7 \u09ae\u09c1\u0996\u09c7 \u09ae\u09c1\u0996\u09c7 \u09ac\u09c7\u0981\u099a\u09c7 \u099b\u09bf\u09b2 \u09ac\u09b9\u09c1 \u09ac\u099b\u09b0 \u09a7\u09b0\u09c7\u0964",
    en: "The band split in 1981, but its songs survived for years as an oral tradition passed around Kolkata college campuses.",
  },
{
    bn: "\u09e7\u09ef\u09ef\u09eb \u09b8\u09be\u09b2\u09c7 \u201c\u0986\u09ac\u09be\u09b0 \u09ac\u099b\u09b0 \u0995\u09c1\u09dc\u09bf \u09aa\u09b0\u09c7\u201d \u0985\u09cd\u09af\u09be\u09b2\u09ac\u09be\u09ae \u09a6\u09bf\u09af\u09bc\u09c7 \u09ae\u09b9\u09c0\u09a8\u09c7\u09b0 \u0998\u09cb\u09dc\u09be\u0997\u09c1\u09b2\u09bf\u09b0 \u09a8\u09a4\u09c1\u09a8 \u0995\u09b0\u09c7 \u09ab\u09bf\u09b0\u09c7 \u0986\u09b8\u09be\u0964",
    en: "Moheener Ghoraguli resurfaced in 1995 with the album Aabaar Bochhor Kuri Pore.",
  },
{
    bn: "\u0995\u09cd\u09af\u09be\u0995\u099f\u09be\u09b8, \u099a\u09a8\u09cd\u09a6\u09cd\u09b0\u09ac\u09bf\u09a8\u09cd\u09a6\u09c1, \u09ab\u09b8\u09bf\u09b2\u09b8, \u09ad\u09c2\u09ae\u09bf, \u09b2\u0995\u09cd\u09b7\u09cd\u09ae\u09c0\u099b\u09be\u09dc\u09be \u2014 \u09a8\u09ac\u09cd\u09ac\u0987\u09af\u09bc\u09c7\u09b0 \u09b6\u09c7\u09b7 \u09a5\u09c7\u0995\u09c7 \u09a6\u09c1\u09b9\u09be\u099c\u09be\u09b0\u09c7\u09b0 \u09a6\u09b6\u0995\u09c7 \u098f\u0995\u099d\u09be\u0981\u0995 \u09ac\u09be\u0982\u09b2\u09be \u09ac\u09cd\u09af\u09be\u09a8\u09cd\u09a1 \u098f\u0987 \u09a7\u09be\u09b0\u09be\u0995\u09c7 \u098f\u0997\u09bf\u09af\u09bc\u09c7 \u09a8\u09bf\u09af\u09bc\u09c7 \u09af\u09be\u09af\u09bc\u0964",
    en: "Cactus, Chandrabindoo, Fossils, Bhoomi and Lakkhichhara carried the \u201cBangla Band\u201d wave forward from the late 1990s through the 2000s.",
  },
{
    bn: "\u201c\u09ac\u09be\u0982\u09b2\u09be \u09ac\u09cd\u09af\u09be\u09a8\u09cd\u09a1\u201d \u0986\u09a8\u09cd\u09a6\u09cb\u09b2\u09a8\u09c7 \u0997\u09be\u09df\u0995\u09c7\u09b0 \u09ac\u09a6\u09b2\u09c7 \u09ac\u09cd\u09af\u09be\u09a8\u09cd\u09a1 \u09b9\u09af\u09bc\u09c7 \u0993\u09a0\u09c7 \u0986\u09b8\u09b2 \u09aa\u09b0\u09bf\u099a\u09af\u09bc \u2014 \u098f\u0995\u0995 \u09b6\u09bf\u09b2\u09cd\u09aa\u09c0\u09b0 \u09ac\u09a6\u09b2\u09c7 \u09a6\u09b2 \u09b9\u09bf\u09b8\u09c7\u09ac\u09c7 \u0997\u09be\u09a8 \u09ac\u09be\u0981\u09a7\u09be \u09b9\u09af\u09bc\u0964",
    en: "Unlike the singer-songwriter driven jibanmukhi wave, the \u201cBangla Band\u201d movement put the group \u2014 not a solo artist \u2014 at the centre of the music.",
  },
{
    bn: "\u0997\u09cc\u09a4\u09ae \u099a\u099f\u09cd\u099f\u09cb\u09aa\u09be\u09a7\u09cd\u09af\u09be\u09af\u09bc \u09aa\u09cd\u09b0\u09af\u09bc\u09be\u09a4 \u09b9\u09a8 \u09e7\u09ef\u09ef\u09ef \u09b8\u09be\u09b2\u09c7, \u09a4\u09be\u0981\u09b0 \u09b6\u09c7\u09b7 \u0985\u09cd\u09af\u09be\u09b2\u09ac\u09be\u09ae \u201c\u0996\u09cd\u09af\u09be\u09aa\u09be\u09b0 \u0997\u09be\u09a8\u201d \u09aa\u09cd\u09b0\u0995\u09be\u09b6\u09c7\u09b0 \u09ac\u099b\u09b0\u09c7\u0987\u0964",
    en: "Gautam Chattopadhyay passed away in 1999, the same year his final album Khyapar Gaan was released.",
  },
{
    bn: "\u098f\u0987 \u09ac\u09cd\u09af\u09be\u09a8\u09cd\u09a1\u0997\u09c1\u09b2\u09cb\u09b0 \u0997\u09be\u09a8\u09c7 \u09b0\u0995, \u09ac\u09cd\u09b2\u09c1\u099c, \u09ac\u09be\u0989\u09b2 \u0986\u09b0 \u09b2\u09cb\u0995\u0997\u09be\u09a8\u09c7\u09b0 \u09ae\u09bf\u09b6\u09c7\u09b2 \u2014 \u09a8\u09bf\u099b\u0995 \u09aa\u09b6\u09cd\u099a\u09bf\u09ae\u09c0 \u0985\u09a8\u09c1\u0995\u09b0\u09a3 \u09a8\u09af\u09bc\u0964",
    en: "These bands blended rock and blues with Baul and Bengali folk \u2014 not a straight copy of Western rock.",
  },
{
    bn: "\u09e8\u09e6\u09e6\u09e6-\u098f\u09b0 \u09a6\u09b6\u0995\u09c7 \u09b8\u09b8\u09cd\u09a4\u09be \u0987\u09a8\u09cd\u099f\u09be\u09b0\u09a8\u09c7\u099f \u0986\u09b8\u09be\u09b0 \u09aa\u09b0 \u098f\u0987 \u09ac\u09cd\u09af\u09be\u09a8\u09cd\u09a1\u0997\u09c1\u09b2\u09cb\u09b0 \u0997\u09be\u09a8 \u09a8\u09a4\u09c1\u09a8 \u09aa\u09cd\u09b0\u099c\u09a8\u09cd\u09ae\u09c7\u09b0 \u0995\u09be\u099b\u09c7 \u099b\u09dc\u09bf\u09af\u09bc\u09c7 \u09aa\u09dc\u09c7 \u0986\u09b0\u0993 \u09a6\u09cd\u09b0\u09c1\u09a4\u0964",
    en: "Affordable internet in the 2000s helped this \u201cBangla Band\u201d music reach a new generation far faster than before.",
  },
    ],
  },
  {
    slug: "retro",
    label: "Retro",
    bgImage: "/images/bg-retro.png",
    accent: "#c2665a",
    accentSoft: "rgba(194, 102, 90, 0.35)",
    playlist: {
      id: "PLTz4HDY4LRMQ",
      url: "https://music.youtube.com/playlist?list=PLTz4HDY4LRMQ",
    },
    trivia: [
{
    bn: "পঞ্চাশ থেকে সত্তরের দশক ধরা হয় বাংলা ছবির গানের স্বর্ণযুগ — হেমন্ত মুখোপাধ্যায়, সন্ধ্যা মুখোপাধ্যায়, মান্না দে, কিশোর কুমারের মতো শিল্পী, আর সলিল চৌধুরী, সুধীন দাশগুপ্তর মতো সুরকারদের হাত ধরে।",
    en: "The 1950s–70s are considered the golden age of Bengali film music, carried by voices like Hemanta Mukherjee, Sandhya Mukherjee, Manna Dey and Kishore Kumar, and composers like Salil Chowdhury and Sudhin Dasgupta.",
  },
{
    bn: "হেমন্ত মুখোপাধ্যায় আর সন্ধ্যা মুখোপাধ্যায়ের যুগলবন্দি পর্দায় উত্তমকুমার-সুচিত্রা সেনের রোমান্সের কণ্ঠস্বর হয়ে উঠেছিল।",
    en: "The Hemanta–Sandhya duet became the singing voice behind Uttam Kumar and Suchitra Sen's on-screen romances.",
  },
{
    bn: "১৯৬১ সালের “সপ্তপদী” ছবির “এই পথ যদি না শেষ হয়” গানটি হেমন্ত নিজেই সুর করেছিলেন, লিখেছিলেন গৌরীপ্রসন্ন মজুমদার।",
    en: "\"Ei Poth Jodi Na Shesh Hoy\" from the 1961 film Saptapadi was composed by Hemanta Mukherjee himself, with lyrics by Gauriprasanna Majumder.",
  },
{
    bn: "মান্না দে সারাজীবনে চার হাজারেরও বেশি গান রেকর্ড করেছিলেন, ফিল্মি গানের পাশাপাশি রবীন্দ্রসঙ্গীতও গেয়েছেন।",
    en: "Manna Dey recorded over 4,000 songs across his career, singing Rabindra Sangeet alongside his film work.",
  },
{
    bn: "সন্ধ্যা মুখোপাধ্যায় ১৯৬৬ সালে কবি শ্যামল গুপ্তকে বিয়ে করেন, যিনি পরে তাঁর অনেক গানের কথা লিখেছিলেন।",
    en: "Sandhya Mukherjee married poet Shyamal Gupta in 1966, who went on to write lyrics for many of her songs.",
  },
{
    bn: "সত্যজিৎ রায় নিজে “গুপী গাইন বাঘা বাইন”-এর গান লিখেছিলেন আর সুর করেছিলেন, গেয়েছিলেন অনুপ ঘোষাল।",
    en: "Satyajit Ray wrote and composed the songs for Goopy Gyne Bagha Byne himself, sung by Anup Ghoshal.",
  },
    ],
  },
  {
    slug: "folk",
    label: "Folk",
    bgImage: "/images/bg-folk.png",
    accent: "#7fa05a",
    accentSoft: "rgba(127, 160, 90, 0.35)",
    playlist: {
      id: "PLUEwN0BL8Ijw",
      url: "https://music.youtube.com/playlist?list=PLUEwN0BL8Ijw",
    },
    trivia: [
{
    bn: "২০০৫ সালে ইউনেস্কো বাউল গানকে মানবতার মৌখিক ও অধরা ঐতিহ্যের শ্রেষ্ঠ নিদর্শন হিসেবে স্বীকৃতি দেয়।",
    en: "In 2005, UNESCO recognized Baul songs as a Masterpiece of the Oral and Intangible Heritage of Humanity.",
  },
{
    bn: "বাউল গানের প্রধান বাদ্যযন্ত্র একতারা, দোতারা আর খমক — গানের বিষয় প্রেম, ভক্তি আর প্রকৃতির সঙ্গে একাত্মতা।",
    en: "Baul music's main instruments are the ektara, dotara and khamak — its songs center on love, devotion, and oneness with nature.",
  },
{
    bn: "লালন ফকির বাউল গানের সবচেয়ে সম্মানিত রচয়িতা, যাঁর গানে বৈষ্ণব আর সুফি ভাবধারার মিশেল দেখা যায়।",
    en: "Lalon Fakir is Baul music's most revered composer, his songs blending Vaishnava and Sufi philosophy.",
  },
{
    bn: "মাঝিদের গাওয়া ভাটিয়ালি গান নদী আর নৌকাজীবনের কথা বলে — আব্বাসউদ্দিন আহমেদ গ্রামোফোন আর রেডিওর হাত ধরে এই গানকে ঘরে ঘরে পৌঁছে দেন।",
    en: "Bhatiali, sung by boatmen, speaks of river and boat life — Abbasuddin Ahmed carried it into homes everywhere via gramophone and radio.",
  },
{
    bn: "উত্তরবঙ্গের রংপুর-কোচবিহার অঞ্চল থেকে উঠে আসা ভাওয়াইয়া গানে গ্রামীণ জীবনের বিরহ আর কষ্টের সুর ফুটে ওঠে।",
    en: "Bhawaiya, rising from North Bengal's Rangpur–Cooch Behar region, carries the melancholy of rural longing and hardship.",
  },
{
    bn: "রবীন্দ্রনাথ ঠাকুর বাউল সুর আর দর্শনে গভীরভাবে প্রভাবিত হয়েছিলেন, তাঁর অনেক গানেই এর ছাপ স্পষ্ট।",
    en: "Rabindranath Tagore was deeply influenced by Baul melody and philosophy — the imprint shows clearly across many of his own songs.",
  },
    ],
  },
];
