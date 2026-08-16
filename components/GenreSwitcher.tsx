import Link from "next/link";
import type { Genre } from "@/data/genres";

type Props = {
  genres: Genre[];
  active: string;
};

export default function GenreSwitcher({ genres, active }: Props) {
  return (
    <nav className="toggle" aria-label="Genre switch">
      {genres.map((g) => (
        <Link key={g.slug} href={`/${g.slug}`} data-active={g.slug === active}>
          {g.label}
        </Link>
      ))}
    </nav>
  );
}
