import type { CSSProperties } from "react";
import Clock from "@/components/Clock";
import DiscIcon from "@/components/DiscIcon";
import GenreSwitcher from "@/components/GenreSwitcher";
import TriviaStrip from "@/components/Trivia";
import Player from "@/components/Player";
import { genres, type Genre } from "@/data/genres";
import { basePath } from "@/lib/basePath";

type Props = {
  genre: Genre;
};

export default function GenreShell({ genre }: Props) {
  return (
    <div
      className="stage"
      style={
        {
          "--accent": genre.accent,
          "--accent-soft": genre.accentSoft,
        } as CSSProperties
      }
    >
      <div
        className="stage__bg"
        style={{ backgroundImage: `url(${basePath}${genre.bgImage})` }}
      />
      <div className="stage__scrim" />

      <Clock />
     
      <DiscIcon href={genre.playlist.url} />

      <div className="titleblock">
        <h1 className="titleblock__title">
          {"\u0986\u09a1\u09cd\u09a1\u09be"} <span className="titleblock__en">FM</span>
        </h1>
        <GenreSwitcher genres={genres} active={genre.slug} />
      </div>

      <TriviaStrip items={genre.trivia} />
      <Player playlistId={genre.playlist.id} mountId="yt-player" />
    </div>
  );
}
