import React, { Component } from "react";
import { Button } from "semantic-ui-react";

import "./Notes.css";

class Notes extends Component {
  createNotes = note => {
    let colors = [
      "red",
      "orange",
      "yellow",
      "olive",
      "green",
      "teal",
      "blue",
      "violet",
      "purple",
      "pink"
    ];
    let color = note.color;
    return (
      <div
        className="cards"
        key={note.key}
        completed={note.completed}
        clicked={note.clicked}
      >
        <div
          onClick={() => this.clicked(note.key)}
          id="new-note"
          className={"ui " + color + " card fluid"}
        >
          <div className="content" style={{ background: "#FFF8E1" }}>
            {note.completed ? (
              <p style={{ textDecoration: "line-through" }}>{note.text}</p>
            ) : note.edit ? (
              <div className="ui input fluid focus">
                <input
                  ref={a => (this._inputElement = a)}
                  placeholder={note.text}
                  type="text"
                />
                <Button
                  type="submit"
                  className="ui inverted violet"
                  id="add-btn"
                  onClick={() => {
                    this.updateNote(note.key);
                  }}
                >
                  <div>
                    <i className="right arrow icon" />
                  </div>
                </Button>
              </div>
            ) : (
              <strong>{note.text}</strong>
            )}
          </div>
          <div className="extra content" style={{ background: color }}>
            {note.clicked ? (
              <div className="ui two buttons" style={{ background: "#FFECB3" }}>
                <div
                  className="ui basic green button"
                  onClick={() => this.completed(note.key)}
                >
                  <i className="check circle icon" />
                </div>
                <div
                  className="ui basic yellow button"
                  onClick={() => this.edit(note.key)}
                >
                  <i className="edit icon" />
                </div>
              </div>
            ) : (
              <p />
            )}
          </div>
        </div>
      </div>
    );
  };

  delete = key => {
    this.props.delete(key);
  };

  completed = key => {
    this.props.complete(key);
  };

  clicked = key => {
    this.props.clicked(key);
  };

  edit = key => {
    this.props.edit(key);
  };

  updateNote = key => {
    const newText = this._inputElement.value;
    this.props.updateNote(key, newText);
  };

  sortedList = () => {
    let noteEntries = this.props.entries;
    let listItems = noteEntries.map(this.createNotes);
    let incomplete = listItems.filter(item => item.props.completed === false);
    let complete = listItems.filter(item => item.props.completed === true);

    if (this.props.sort === "new") {
      incomplete.sort(this.newToOldSort);
      complete.sort(this.newToOldSort);
      return [...incomplete, complete];
    }

    if (this.props.sort === "old") {
      incomplete.sort(this.oldToNewSort);
      complete.sort(this.oldToNewSort);
      return [...incomplete, complete];
    }
  };

  newToOldSort = (a, b) => {
    if (a.key < b.key) return -1;
    if (a.key > b.key) return 1;
    return 0;
  };

  oldToNewSort = (a, b) => {
    if (a.key > b.key) return -1;
    if (a.key < b.key) return 1;
    return 0;
  };

  render() {
    let sortedList = this.sortedList();
    return <div className="note-list">{sortedList}</div>;
  }
}

export default Notes;
