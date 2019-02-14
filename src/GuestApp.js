import React, { Component } from "react";
import Particles from "react-particles-js";
import { Button, Icon } from "semantic-ui-react";
import Header from "./components/Header";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import params from "./particles";
import paramsMobile from "./particlesMobile";

import "./GuestApp.css";

class GuestApp extends Component {
  onNoteSubmit = note => {
    this.setState(prevState => {
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

  completeNote = key => {
    let completedNote = this.state.notes.filter(function(item) {
      return item.key === key;
    });

    completedNote = completedNote[0];
    completedNote.completed = true;

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
          getUser={this.props.getUser}
        />
        <NewNote onSubmit={this.onNoteSubmit} />
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

export default GuestApp;
