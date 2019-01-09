import React, { Component } from 'react';
import Notes from './Notes';
import './NewNote.css';

class NewNote extends Component {


  onFormSubmit = e => {
    e.preventDefault();
    if (this._inputElement.value !=="") {

      var newNote = {
        text: this._inputElement.value,
        key: Date.now()
      };

      console.log(newNote)
    }

    this.props.onSubmit(newNote);

    this._inputElement.value ="";
  }


  render() {
    return(
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="note-list">
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
      </div>
    )
  }
}

export default NewNote;