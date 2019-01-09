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
      <div className="ui raised compact padded yellow inverted tertiary segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="note-list">
            <div className="ui input">
              <input
                ref={(a) => this._inputElement = a}
                placeholder="Write new note here..."
                type="text"
                className="ui input"
              />
              <button type="submit" className="ui black basic button">add</button>
            </div>
          </div>
          <div>
          </div>
        </form>
      </div>
    )
  }
}

export default NewNote;