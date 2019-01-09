import React, { Component } from 'react';
import NewNote from './components/NewNote';
import Notes from './components/Notes';
import './App.css';

class App extends Component {

  onNoteSubmit = (note) => {
    console.log(note)
    
    this.setState(prevState => {
      return {
        notes: prevState.notes.concat(note)
      }
    });
    console.log(this.state.notes)

  }

  state = { notes: [] };

  deleteNote = (key) => {
    let filteredNotes = this.state.notes.filter(function (item) {
      return (item.key !== key)
    });

    this.setState({
      notes: filteredNotes
    });
  }

  render() {
    return (
      <div className="App">
        <div className="ui raised padded segment" id="header">
          <h1>Color Notes</h1>
        </div>
        <NewNote onSubmit={this.onNoteSubmit} />
        <Notes entries={this.state.notes} delete={this.deleteNote}/>
      </div>
    );
  }
}

export default App;
