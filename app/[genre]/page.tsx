import { notFound } from "next/navigation";
import GenreShell from "@/components/GenreShell";
import { genres } from "@/data/genres";

export function generateStaticParams() {
  return genres.map((g) => ({ genre: g.slug }));
}

export default function GenrePage({
  params,
}: {
  params: { genre: string };
}) {
  const genre = genres.find((g) => g.slug === params.genre);
  if (!genre) return notFound();
  return <GenreShell genre={genre} />;
}
