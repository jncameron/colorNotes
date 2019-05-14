import React, { Component } from "react";
import { Button } from "semantic-ui-react";

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
      { yellow: "#FFD700" },
      { olive: "#32CD32" },
      { green: "#016936" },
      { teal: "#008080" },
      { blue: "#0E6EB8" },
      { violet: "#EE82EE" },
      { purple: "#B413EC" },
      { pink: "#FF1493" }
    ];
    let color = note.color;
    console.log("color is: " + color);

    let selectedColor = () => {
      console.log("running");
      for (let col in colors) {
        console.log(colors[col]);
        console.log(Object.keys(colors[col]));
        console.log(this.color);
        if (Object.keys(colors[col])[0] === color) {
          console.log(color);
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
        <div
          onClick={() => this.clicked(note.key)}
          id="new-note"
          className={"ui " + color + " card fluid"}
        >
          <div
            className="content"
            style={{ background: selectedColor(), opacity: 0.9 }}
          >
            {note.completed ? (
              <p style={{ textDecoration: "line-through" }}>{note.text}</p>
            ) : note.edit ? (
              <div className="ui input fluid focus">
                <input
                  autoFocus
                  ref={a => (this._inputElement = a)}
                  value={this.state.inputValue}
                  onChange={this.handleUpdate}
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
          <div
            className="extra content"
            style={{ background: selectedColor() }}
          >
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
                  onClick={() => this.edit(note)}
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

  edit = note => {
    this.setState({ inputValue: note.text });
    this.props.edit(note.key);
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
