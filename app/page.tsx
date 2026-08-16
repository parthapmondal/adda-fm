import GenreShell from "@/components/GenreShell";
import { genres } from "@/data/genres";

export default function Home() {
  return <GenreShell genre={genres[0]} />;
}
