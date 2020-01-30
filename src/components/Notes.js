import React, { Component } from "react";
import EditingNote from "./EditingNote";
import NoteClicked from "./NoteClicked";

import "./Notes.css";

class Notes extends Component {
  constructor() {
    super();
    this.state = { inputValue: "" };
  }

  handleUpdate = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  createNotes = note => {
    let colors = [
      { red: "#B03060" },
      { orange: "#FE9A76" },
      { yellow: "#f9ca24" },
      { olive: "#32CD32" },
      { green: "#016936" },
      { teal: "#008080" },
      { blue: "#0E6EB8" },
      { violet: "#EE82EE" },
      { purple: "#4834d4" },
      { pink: "#be2edd" },
      { grey: "#A9A9A9" }
    ];
    let color = note.color;

    let selectedColor = () => {
      for (let col in colors) {
        if (Object.keys(colors[col])[0] === color) {
          return Object.values(colors[col])[0];
        }
      }
    };
    return (
      <div
        className="cards"
        key={note.key}
        completed={note.completed}
        clicked={note.clicked}
      >
        <div id="new-note" className={"ui " + color + " card fluid"}>
          {note.completed ? (
            <div>
              <div
                className="content"
                id="content-main"
                style={{ background: "#A9A9A9", opacity: 0.9 }}
                onClick={() => this.completed(note.key)}
              >
                <p style={{ textDecoration: "line-through" }}>{note.text}</p>
              </div>
            </div>
          ) : (
            <div
              className="content"
              style={{ background: selectedColor(), opacity: 0.9 }}
              onClick={() => this.clicked(note.key)}
            >
              {note.edit ? (
                <EditingNote
                  editButtonColor={selectedColor()}
                  handleUpdate={this.handleUpdate}
                  updateNote={this.props.updateNote}
                  inputValue={this.state.inputValue}
                  note={note}
                />
              ) : (
                <p>
                  <strong>{note.text}</strong>
                </p>
              )}
            </div>
          )}
          <div
            className="extra-content"
            style={{ background: selectedColor() }}
          >
            {note.clicked ? (
              <NoteClicked
                note={note}
                edit={this.edit}
                completed={this.completed}
              />
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
    console.log("key for completion " + key);
    this.props.complete(key);
  };

  clicked = key => {
    console.log("key for clicked " + key);

    this.props.clicked(key);
  };

  edit = note => {
    this.setState({ inputValue: note.text });
    this.props.edit(note.key);
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
