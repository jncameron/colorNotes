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
        completed: false
      };
      this.props.onSubmit(newNote);
    }
    this._inputElement.value ="";
  }

  render() {
    return(
      <div>
        <Segment ui raised padded compact segment id="note-input">
        <form onSubmit={this.onFormSubmit} >
          <div className="note-list">
            <div className="ui input focus">
              <input
                ref={(a) => this._inputElement = a}
                placeholder="Write new note here..."
                type="text"
              />
              <Button ui inverted animated button
                type="submit" 
                className="violet"
                id="add-btn" >
                  <div className="visible content">add</div>
                  <div className="hidden content">
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