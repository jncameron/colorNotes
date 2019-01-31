import React, { Component } from 'react';
import Particles from 'react-particles-js';
import { Button, Grid } from 'semantic-ui-react';
import NewNote from './components/NewNote';
import Notes from './components/Notes';
import params from './particles';
import './App.css';

class App extends Component {

  onNoteSubmit = (note) => {
    
    this.setState(prevState => {
      return {
        notes: prevState.notes.concat(note)
      }
    });

  }

  state = { notes: [] };

  deleteNote = (key) => {
    let filteredNotes = this.state.notes.filter(function (item) {
      return (item.completed === false)
    });
  

    this.setState({
      notes: filteredNotes
    });
  }

  editNote = (key) => {
    let noteToEdit = this.state.notes;
    for (let i=0; i < noteToEdit.length; i++) {
      if(noteToEdit[i]['key'] === key) {
        noteToEdit[i]['edit'] = true;
      }
    }
    this.setState({notes: noteToEdit})
  }

  completeNote = (key) => {
    let completedNote =  this.state.notes.filter(function (item) {

      return (item.key === key);
    });

    completedNote = completedNote[0]
    completedNote.completed = true;
    
    let filteredNotes = this.state.notes.filter(function (item) {

      return (item.key !== key);
    });

    let newNoteList = [...filteredNotes, completedNote]

    this.setState({
      notes: newNoteList
    });
  }


  render() {
    return (
      
        <div className="App">
        <Particles className="particles" params={params} />
        <div className="ui padded segment" id="header">
          <div className="header-grid">
            <div className="h-col-1">
              <h1>Color Notes</h1>
            </div>
            <div className="h-col-2">
              <Button className="ui inverted violet"
                type="submit" 
                id="add-btn" 
                onClick={this.deleteNote}>
                  <div >
                    <i className="trash alternate icon"></i>
                  </div>
              </Button>  
            </div>

          </div>
        </div>
        <NewNote onSubmit={this.onNoteSubmit} />
        <Notes 
          entries={this.state.notes} 
          delete={this.deleteNote} 
          complete={this.completeNote} 
          edit={this.editNote} 
        />
        </div>
    );
  }
}

export default App;
