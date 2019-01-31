import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import './NewNote.css';

class NewNote extends Component {

  onFormSubmit = e => {
    e.preventDefault();
    if (this._inputElement.value !=="") {

      var newNote = {
        text: this._inputElement.value,
        key: Date.now(),
        edit: false,
        completed: false
      };
      this.props.onSubmit(newNote);
    }
    this._inputElement.value ="";
  }

  render() {
    return(
      <div>
        <Segment className= "ui raised padded compact" id="note-input">
        <form onSubmit={this.onFormSubmit} >
          <div className="note-list">
            <div className="ui input focus new-note-input">
              <input
                ref={(a) => this._inputElement = a}
                placeholder="Write new note here..."
                type="text"
              />
              <Button
                type="submit" 
                className="ui inverted violet"
                id="add-btn" >
                  <div>
                    <i className="right arrow icon"></i>
                  </div>
                
              </Button>
            </div>
          </div>
          <div>
          </div>
        </form>
      </Segment>
      </div>


    )
  }
}

export default NewNote;