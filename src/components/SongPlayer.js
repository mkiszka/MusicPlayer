import { Heading } from "./Heading";
import "./SongPlayer.css";

export function SongPlayer({
  audioRef,
  autoPlay,
  showControls = false,
  song,
  onEnded
}) {
  const { audioUrl, coverUrl, key } = song == null ? [null, null, null] : song;

  return (
    <section className="SongPlayer">
      <Heading title="Music Player" />
      {coverUrl == null ? (
        <div style={{ height: "250px", width: "250px", clear: "both" }}></div>
      ) : (
        <img width="250" height="250" src={coverUrl} alt="Song cover" />
      )}

      <audio
        ref={audioRef}
        key={key}
        controls={showControls}
        autoPlay={autoPlay}
        onEnded={onEnded}
      >
        <source src={audioUrl} />
      </audio>
      {/* <div>
        <button onClick={() => audioRef.current.play()}>Play</button>
        <button onClick={() => audioRef.current.pause()}>Pause</button>
      </div> */}
    </section>
  );
}
