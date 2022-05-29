import { useEffect, useState, useRef } from "react";
import { Heading } from "./Heading";
import { SongListItem } from "./SongListItem";
import { SongPlayer } from "./SongPlayer";

import { Songs } from "./Songs";
import uniqid from "uniqid";
import "./App.css";

export function App() {
  const audioRef = useRef();
  function handleSelectPlaylistSong(selectedSong) {
    debugger;
    const audioIndex = playlistSongs.findIndex(
      (playlistSong) => playlistSong.key === selectedSong.key
    );
    if (audioIndex >= 0) {
      setCurrentPlaylistSongIndex(audioIndex);
    }
  }
  function handleSelectPlaySong() {
    audioRef.current.play();
  }
  function handleAddToPlaylist(selectedSong) {
    let song = Object.assign({}, selectedSong);
    song.key = uniqid();
    setPlaylistSongs([...playlistSongs, song]);
  }
  function handleSelectSong(selectedSong) {
    const audioIndex = songs.findIndex(
      (song) => song.audioUrl === selectedSong.audioUrl
    );
    if (audioIndex >= 0) {
      setCurrentSongIndex(audioIndex);
    }
  }
  const URL = "https://examples.devmastery.pl/songs-api/songs";
  const [songs, setSongs] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [currentPlaylistSongIndex, setCurrentPlaylistSongIndex] = useState(0);
  const currentPlaylistSong = playlistSongs[currentPlaylistSongIndex];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    fetch(URL).then((response) => {
      if (response.ok) {
        response.json().then(setSongs);
      }
    });
  }, []);

  return (
    <div className="App">
      {songs.length === 0 ? (
        "Loading..."
      ) : (
        <>
          <SongPlayer
            audioRef={audioRef}
            song={currentPlaylistSong}
            showControls={true}
          />
          <Songs>
            <Heading title="Playlist" />
            <ul>
              {playlistSongs.map((playlistSong) => {
                return (
                  <SongListItem
                    key={playlistSong.key}
                    song={playlistSong}
                    isCurrent={currentPlaylistSong.key === playlistSong.key}
                    onSelect={handleSelectPlaylistSong}
                    onAfterRender={handleSelectPlaySong}
                  />
                );
              })}
            </ul>
          </Songs>

          <Songs>
            <Heading title="Songs" />
            <ul>
              {songs.map((song) => (
                <SongListItem
                  key={song.audioUrl}
                  song={song}
                  isCurrent={currentSong.audioUrl === song.audioUrl}
                  onSelect={handleSelectSong}
                  onAction={handleAddToPlaylist}
                />
              ))}
            </ul>
          </Songs>
        </>
      )}
    </div>
  );
}
