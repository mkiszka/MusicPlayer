import { useEffect, useState, useRef } from "react";
import { Heading } from "./Heading";
import { SongListItem } from "./SongListItem";
import { SongPlaylistActionContent } from "./SongListItem";
import { SongListActionContent } from "./SongListItem";
import { SongPlayer } from "./SongPlayer";

import { Songs } from "./Songs";
import uniqid from "uniqid";
import "./App.css";

export function App() {
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
    //Don't remove handleSelectPlaySong. It's left for educational purposes.
    //audioRef.current.play();
  }
  function handleOnEnded(event) {
    console.log(playlistSongs.length);
    console.log(currentPlaylistSongIndex);

    let newCurrentPlalistSongIndex = currentPlaylistSongIndex + 1;
    console.log(newCurrentPlalistSongIndex);

    if (playlistSongs.length <= newCurrentPlalistSongIndex) {
      newCurrentPlalistSongIndex = 0;
    }
    console.log(newCurrentPlalistSongIndex);
    setCurrentPlaylistSongIndex(newCurrentPlalistSongIndex);
  }
  function handleAddToPlaylist(selectedSong) {
    let song = Object.assign({}, selectedSong);
    song.key = uniqid();
    setPlaylistSongs([...playlistSongs, song]);
  }
  function handleRemoveFromPlaylist(selectedSong) {
    if (
      currentPlaylistSong != null &&
      selectedSong.key === currentPlaylistSong.key
    ) {
      audioRef.current.pause();
      setCurrentPlaylistSongIndex(-1);
    }
    const newPlaylistSongs = playlistSongs.filter((song) => {
      return song.key !== selectedSong.key;
    });

    setPlaylistSongs(newPlaylistSongs);
  }
  function handleSelectSong(selectedSong) {
    const audioIndex = songs.findIndex(
      (song) => song.audioUrl === selectedSong.audioUrl
    );
    if (audioIndex >= 0) {
      setCurrentSongIndex(audioIndex);
    }
  }

  const audioRef = useRef();
  const URL = "https://examples.devmastery.pl/songs-api/songs";
  const [songs, setSongs] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [currentPlaylistSongIndex, setCurrentPlaylistSongIndex] = useState(0);
  const currentPlaylistSong =
    currentPlaylistSongIndex === -1
      ? null
      : playlistSongs[currentPlaylistSongIndex];

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
            autoPlay={true}
            onEnded={handleOnEnded}
          />
          <Songs>
            <Heading title="Playlist" />
            <ul>
              {playlistSongs.map((playlistSong) => {
                return (
                  <SongListItem
                    key={playlistSong.key}
                    song={playlistSong}
                    isCurrent={
                      currentPlaylistSong == null
                        ? false
                        : currentPlaylistSong.key === playlistSong.key
                    }
                    onSelect={handleSelectPlaylistSong}
                    onAfterRender={handleSelectPlaySong}
                    onAction={handleRemoveFromPlaylist}
                    actionContent={SongPlaylistActionContent}
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
                  actionContent={SongListActionContent}
                />
              ))}
            </ul>
          </Songs>
        </>
      )}
    </div>
  );
}
