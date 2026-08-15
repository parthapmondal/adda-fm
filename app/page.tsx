import Clock from "@/components/Clock";
import DiscIcon from "@/components/DiscIcon";
import TriviaStrip from "@/components/Trivia";
import Player from "@/components/Player";
import { playlist } from "@/data/playlists";
import { trivia } from "@/data/trivia";

export default function Home() {
  return (
    <div className="stage">
      <div
        className="stage__bg"
        style={{ backgroundImage: "url(/images/bg-main.jpg)" }}
      />
      <div className="stage__scrim" />

      <Clock />
      <DiscIcon href={playlist.url} />

      <div className="titleblock">
        <h1 className="titleblock__title">
          {"\u0986\u09a1\u09cd\u09a1\u09be"} <span className="titleblock__en">FM</span>
        </h1>
      </div>

      <TriviaStrip items={trivia} />
      <Player playlistId={playlist.id} mountId="yt-player" />
    </div>
  );
}
