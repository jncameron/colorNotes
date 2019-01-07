import React, { Component } from 'react';
import Notes from './Notes';

class NewNote extends Component {

  state = { notes: [] };

  onFormSubmit = e => {
    e.preventDefault();
    if (this._inputElement.value !=="") {
      var newNote = {
        text: this._inputElement.value,
        key: Date.now()
      };
    }

    this.setState(prevState => {
      return {
        notes: prevState.notes.concat(newNote)
      }
    });

    this._inputElement.value ="";
    console.log(this.state.notes);
  }


  render() {
    return(
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>New Note Title</label>
            <input
              ref={(a) => this._inputElement = a}
              placeholder="enter new note"
              type="text"
            />
            <button type="submit">add</button>
          </div>
          <div>
          </div>
        </form>
        <Notes entries={this.state.notes} />
      </div>
    )
  }
}

export default NewNote;