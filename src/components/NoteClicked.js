import React from "react";

const NoteClicked = ({ note, edit, completed }) => {
  const complete = () => {
    completed(note.key);
  };
  return (
    <div className="d-flex justify-content-between">
      <div className="btn" onClick={() => edit(note)}>
        <img src="/edit.svg" alt="" width="20" height="20" title="sort old" />
      </div>
      <div className="btn" onClick={() => completed(note.key)}>
        <img src="/check.svg" alt="" width="20" height="20" title="sort old" />
      </div>
    </div>
  );
};

export default NoteClicked;
