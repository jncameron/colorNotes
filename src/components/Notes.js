import React, { Component } from "react";
import Tilt from "react-tilt";

import "./Notes.css";

class Notes extends Component {
  createNotes = note => {
    const getRandomInt = max => {
      return Math.floor(Math.random() * Math.floor(max));
    };
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
    let randNum = getRandomInt(10);
    let color = note.color;
    return note.completed === false ? (
      window.innerWidth > 600 ? (
        <Tilt className="Tilt" key={note.key} completed={note.completed}>
          <div
            onClick={() => this.completed(note.key)}
            id="new-note"
            className={
              "note ui inverted " + color + " segment raised Tilt-inner"
            }
          >
            <strong>{note.text}</strong>
          </div>
        </Tilt>
      ) : (
        <div
          key={note.key}
          completed={note.completed}
          onClick={() => this.completed(note.key)}
          id="new-note"
          className={"note ui inverted " + color + " segment"}
        >
          <strong>{note.text}</strong>
        </div>
      )
    ) : window.innerWidth > 600 ? (
      <Tilt className="Tilt" key={note.key} completed={note.completed}>
        <div
          onClick={() => this.delete(note.key)}
          id="new-note"
          className={
            "note ui inverted segment grey raised Tilt-inner completed"
          }
        >
          {note.text}
        </div>
      </Tilt>
    ) : (
      <div
        key={note.key}
        completed={note.completed}
        onClick={() => this.delete(note.key)}
        id="new-note"
        className={"note ui inverted segment grey completed"}
      >
        {note.text}
      </div>
    );
  };

  delete = key => {
    this.props.delete(key);
  };

  completed = key => {
    this.props.complete(key);
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
