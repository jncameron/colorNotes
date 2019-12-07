import React, { Component } from "react";

import Header from "./components/Header";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";

import "./GuestApp.css";

class GuestApp extends Component {
  onNoteSubmit = note => {
    this.setState(prevState => {
      note.key = Date.now();
      return {
        notes: prevState.notes.concat(note)
      };
    });
  };

  state = {
    notes: [],
    sortBy: "new"
  };

  deleteNote = key => {
    let filteredNotes = this.state.notes.filter(function(item) {
      return item.completed === false;
    });

    this.setState({
      notes: filteredNotes
    });
  };

  editNote = key => {
    let noteToEdit = this.state.notes;
    for (let i = 0; i < noteToEdit.length; i++) {
      if (noteToEdit[i]["key"] === key) {
        noteToEdit[i]["edit"] = true;
      }
    }
    this.setState({ notes: noteToEdit });
  };

  updateNote = (key, newText) => {
    let noteToEdit = this.state.notes;
    for (let i = 0; i < noteToEdit.length; i++) {
      if (noteToEdit[i]["key"] === key) {
        noteToEdit[i]["text"] = newText;
        noteToEdit[i]["edit"] = false;
      }
    }
    this.setState({ notes: noteToEdit });
  };

  completeNote = key => {
    let completedNote = this.state.notes.filter(function(item) {
      return item.key === key;
    });

    completedNote = completedNote[0];
    completedNote.completed = !completedNote.completed;
    completedNote.clicked = false;

    let filteredNotes = this.state.notes.filter(function(item) {
      return item.key !== key;
    });

    let newNoteList = [...filteredNotes, completedNote];

    this.setState({
      notes: newNoteList
    });
  };

  clickNote = key => {
    let clickNote = this.state.notes.filter(function(item) {
      return item.key === key;
    });

    clickNote = clickNote[0];
    if (!clickNote.clicked && !clickNote.completed) {
      clickNote.clicked = true;
    } else {
      clickNote.clicked = false;
    }

    let filteredNotes = this.state.notes.filter(function(item) {
      return item.key !== key;
    });

    let newNoteList = [...filteredNotes, clickNote];

    this.setState({
      notes: newNoteList
    });
  };

  sortNotesNew = () => {
    this.setState({ sortBy: "new" });
  };

  sortNotesOld = () => {
    this.setState({ sortBy: "old" });
  };

  render(props) {
    return (
      <div className="App">
        <Header
          sortNotesNew={this.sortNotesNew}
          sortNotesOld={this.sortNotesOld}
          deleteNote={this.deleteNote}
          authenticated={this.props.authenticated}
          authenticate={this.props.authenticate}
          getUser={this.props.getUser}
          getUserToken={this.props.getUserToken}
        />
        <NewNote onSubmit={this.onNoteSubmit} />
        <Notes
          entries={this.state.notes}
          delete={this.deleteNote}
          complete={this.completeNote}
          edit={this.editNote}
          sort={this.state.sortBy}
          clicked={this.clickNote}
          updateNote={this.updateNote}
        />
      </div>
    );
  }
}

export default GuestApp;
