import React, { Component } from "react";
import Header from "./components/Header";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";

import "./App.css";

const initialState = {
  notes: [],
  sortBy: "new",
  route: "signin"
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount = loadNotes => {
    const bearer = `Bearer ${localStorage.getItem("authtoken")}`;
    if (bearer !== null) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}loadnotes`, {
        method: "post",
        headers: { "Content-Type": "application/json", Authorization: bearer },
        body: JSON.stringify({
          user_id: this.props.user._id
        })
      })
        .then(response => response.json())
        .then(notes => {
          let savedNotes = [];
          for (let n = 0; n < notes.length; n++) {
            let note = notes[n];
            savedNotes.push({
              key: note._id,
              text: note.note_body,
              completed: note.completed,
              edit: note.edit,
              color: note.color
            });
          }
          this.setState({ notes: savedNotes });
        });
    }
  };

  onNoteSubmit = note => {
    const bearer = `Bearer ${localStorage.getItem("authtoken")}`;
    fetch(`${process.env.REACT_APP_BACKEND_URL}notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: bearer },
      body: JSON.stringify({
        user_id: this.props.user._id,
        note_body: note.text,
        completed: false,
        edit: false,
        clicked: false,
        color: note.color
      })
    })
      .then(res => res.json())
      .then(res => {
        this.setState(prevState => {
          return {
            notes: prevState.notes.concat({
              user_id: res.user_id,
              key: res._id,
              text: res.note_body,
              completed: res.completed,
              edit: res.edit,
              color: res.color
            })
          };
        });
      });
  };

  deleteNote = key => {
    let filteredNotes = this.state.notes.filter(function(item) {
      return item.completed === false;
    });
    const bearer = `Bearer ${localStorage.getItem("authtoken")}`;

    fetch(`${process.env.REACT_APP_BACKEND_URL}deletenote`, {
      method: "post",
      headers: { "Content-Type": "application/json", Authorization: bearer },
      body: JSON.stringify({
        id: this.props.user._id
      })
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
    const bearer = `Bearer ${localStorage.getItem("authtoken")}`;

    fetch(`${process.env.REACT_APP_BACKEND_URL}updatenote`, {
      method: "post",
      headers: { "Content-Type": "application/json", Authorization: bearer },
      body: JSON.stringify({
        note_id: key.toString(),
        updatedText: newText
      })
    });

    this.setState({ notes: noteToEdit });
  };

  completeNote = key => {
    let completedNote = this.state.notes.filter(function(item) {
      return item.key === key;
    });

    completedNote = completedNote[0];
    completedNote.completed = !completedNote.completed;
    completedNote.clicked = false;
    const bearer = `Bearer ${localStorage.getItem("authtoken")}`;

    fetch(`${process.env.REACT_APP_BACKEND_URL}completenote`, {
      method: "post",
      headers: { "Content-Type": "application/json", Authorization: bearer },
      body: JSON.stringify({
        note_id: completedNote.key.toString()
      })
    });

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
          user={this.props.user}
          signOut={this.props.signOut}
        />
        <NewNote
          onSubmit={this.onNoteSubmit}
          authenticated={this.props.authenticated}
          user={this.props.user}
        />
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

export default App;
