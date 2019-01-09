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
        <div className="ui raised padded inverted green tertiary segment">
          <h1>Color Notes</h1>
          <img src="./sort.svg" height="20px"/>
        </div>


        <NewNote onSubmit={this.onNoteSubmit} />
        <Notes entries={this.state.notes} delete={this.deleteNote}/>
      </div>
    );
  }
}

export default App;
