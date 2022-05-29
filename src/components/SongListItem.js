import { useEffect } from "react";
import "./SongListItem.css";
export function SongPlaylistActionContent() {
  return <span>[-]</span>;
}
export function SongListActionContent() {
  return <span>[+]</span>;
}
export function SongListItem({
  song,
  isCurrent,
  onSelect,
  onAction,
  onAfterRender,
  actionContent,
  showLog = false
}) {
  function handleClick() {
    if (onSelect) {
      onSelect(song);
    }
  }
  function handleActionClick() {
    if (onAction) {
      onAction(song);
    }
  }
  if (showLog) {
    console.log(song);
  }

  useEffect(() => {
    if (onAfterRender) {
      onAfterRender();
    }
  });

  return (
    <li className={`SongListItem ParentElement ${isCurrent ? "selected" : ""}`}>
      <div className={"ChildElement"} onClick={handleClick}>
        {song.title} by {song.artist}
      </div>
      <div
        className={"ChildElement ChildActionElement"}
        onClick={handleActionClick}
      >
        {actionContent()}
      </div>
    </li>
  );
}
