import "./SongListItem.css";

export function SongListItem({
  song,
  isCurrent,
  onSelect,
  onAction,
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

  return (
    <li
      className={`SongListItem ParentElement ${isCurrent ? "selected" : ""}`}
      onClick={handleClick}
    >
      <div className={"ChildElement"}>
        {song.title} by {song.artist}
      </div>
      <div
        className={"ChildElement ChildActionElement"}
        onClick={handleActionClick}
      >
        [+]
      </div>
    </li>
  );
}
