import React, { Component } from "react";
import Particles from "react-particles-js";
import Header from "./components/Header";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import params from "./particles";
import paramsMobile from "./particlesMobile";

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
    fetch("http://localhost:8081/loadnotes", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: this.props.user._id
      })
    })
      .then(response => response.json())
      .then(notes => {
        console.log(notes);
        let savedNotes = [];
        for (let n = 0; n < notes.length; n++) {
          let note = notes[n];
          savedNotes.push({
            key: note._id,
            text: note.note_body,
            completed: note.completed,
            edit: note.edit
          });
        }
        this.setState({ notes: savedNotes });
      });
  };

  onNoteSubmit = note => {
    this.setState(prevState => {
      fetch("http://localhost:8081/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: this.props.user._id,
          note_id: note.key.toString(),
          note_body: note.text,
          completed: false,
          edit: false
        })
      });
      return {
        notes: prevState.notes.concat(note)
      };
    });
  };

  deleteNote = key => {
    let filteredNotes = this.state.notes.filter(function(item) {
      return item.completed === false;
    });

    fetch("http://localhost:8081/deletenote", {
      method: "post",
      headers: { "Content-Type": "application/json" },
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

  completeNote = key => {
    let completedNote = this.state.notes.filter(function(item) {
      return item.key === key;
    });

    completedNote = completedNote[0];
    completedNote.completed = true;

    fetch("http://localhost:8081/completenote", {
      method: "post",
      headers: { "Content-Type": "application/json" },
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

  sortNotesNew = () => {
    this.setState({ sortBy: "new" });
  };

  sortNotesOld = () => {
    this.setState({ sortBy: "old" });
  };

  render(props) {
    return (
      <div className="App">
        {window.innerWidth > 870 ? (
          <Particles className="particles" params={params} />
        ) : (
          <Particles className="particles" params={paramsMobile} />
        )}
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
        />
      </div>
    );
  }
}

export default App;
