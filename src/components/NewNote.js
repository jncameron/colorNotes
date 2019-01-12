import React, { Component } from 'react';
import './NewNote.css';

class NewNote extends Component {

  onFormSubmit = e => {
    e.preventDefault();
    if (this._inputElement.value !=="") {

      var newNote = {
        text: this._inputElement.value,
        key: Date.now()
      };
      this.props.onSubmit(newNote);
    }
    this._inputElement.value ="";
  }

  render() {
    return(
      <div>
        <div className="ui raised very padded compact segment" id="note-input">
        <form onSubmit={this.onFormSubmit} >
          <div className="note-list">
            <div className="ui input focus">
              <input
                ref={(a) => this._inputElement = a}
                placeholder="Write new note here..."
                type="text"
              />
              <button type="submit" 
                className="ui teal inverted animated button" 
                id="add-btn" >
                  <div className="visible content">add</div>
                  <div className="hidden content">
                    <i className="right arrow icon"></i>
                  </div>
                
              </button>
            </div>
          </div>
          <div>
          </div>
        </form>
      </div>
      </div>


    )
  }
}

export default NewNote;