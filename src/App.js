import React, { Component } from 'react';
import NewNote from './components/NewNote';
import Notes from './components/Notes';

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

  render() {
    return (
      <div className="App">
        <button className="ui button inverted green">Old to New</button>
        <button className="ui button inverted green">New to Old</button>
        <NewNote onSubmit={this.onNoteSubmit} />
        <Notes entries={this.state.notes} />
      </div>
    );
  }
}

export default App;
