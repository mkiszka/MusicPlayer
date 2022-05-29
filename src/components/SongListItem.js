import { useEffect } from "react";
import "./SongListItem.css";
import { MdOutlineAddCircle } from "react-icons/md";
import { MdOutlineRemoveCircle } from "react-icons/md";

export function SongPlaylistActionContent() {
  return (
    <span>
      <MdOutlineRemoveCircle />
    </span>
  );
}
export function SongListActionContent() {
  return (
    <span>
      <MdOutlineAddCircle />
    </span>
  );
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
      //  onAfterRender();
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
        {" "}
        {actionContent()}
      </div>
    </li>
  );
}
