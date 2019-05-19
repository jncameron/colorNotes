import React from "react";

const NoteClicked = ({ note, edit, completed }) => {
  const complete = () => {
    completed(note.key);
  };
  return (
    <div className="ui two buttons">
      <div className="ui inverted violet button" onClick={() => edit(note)}>
        <i className="edit icon" />
      </div>
    </div>
  );
};

export default NoteClicked;
