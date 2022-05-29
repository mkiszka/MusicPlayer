import { useEffect } from "react";
import { Heading } from "./Heading";
import "./SongPlayer.css";

export function SongPlayer({ audioRef, showControls = false, song }) {
  const { audioUrl, coverUrl } = song == null ? ["none", "none"] : song;
  useEffect(() => {
    console.log("a");
  });
  return (
    <section className="SongPlayer">
      <Heading title="Music Player" />
      <img width="250" height="250" src={coverUrl} alt="Song cover" />
      <audio ref={audioRef} key={audioUrl} controls={showControls}>
        {" "}
        pl
        <source src={audioUrl} />
      </audio>
      <div>
        <button onClick={() => audioRef.current.play()}>Play</button>
        <button onClick={() => audioRef.current.pause()}>Pause</button>
      </div>
    </section>
  );
}
