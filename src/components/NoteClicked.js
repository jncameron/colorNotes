import React from "react";

const NoteClicked = ({ note, edit, completed }) => {
  return (
    <div className="ui two buttons">
      <div
        className="ui inverted green button"
        style={{ background: "#016936" }}
        onClick={() => completed(note.key)}
      >
        <i className="check circle icon" />
      </div>
      <div
        style={{ background: "#FE9A76" }}
        className="ui inverted yellow button"
        onClick={() => edit(note)}
      >
        <i className="edit icon" />
      </div>
    </div>
  );
};

export default NoteClicked;
