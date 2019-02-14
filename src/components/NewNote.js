import React, { Component } from "react";
import { Segment, Button } from "semantic-ui-react";
import "./NewNote.css";

class NewNote extends Component {
  onFormSubmit = e => {
    e.preventDefault();
    if (this._inputElement.value !== "") {
      var newNote = {
        text: this._inputElement.value,
        key: Date.now(),
        edit: false,
        completed: false
      };
      this.props.onSubmit(newNote);
    }
    this._inputElement.value = "";
  };

  render() {
    let placeholder = "What's on your mind today?";
    if (!!this.props.authenticated) {
      placeholder = `What's on your mind, ${this.props.user.name}?`;
    }
    return (
      <div>
        <Segment className="ui raised padded compact" id="note-input">
          <form onSubmit={this.onFormSubmit}>
            <div>
              <div className="ui input focus new-note-input">
                <input
                  ref={a => (this._inputElement = a)}
                  placeholder={placeholder}
                  type="text"
                />

                <Button
                  type="submit"
                  className="ui inverted violet"
                  id="add-btn"
                >
                  <div>
                    <i className="right arrow icon" />
                  </div>
                </Button>
              </div>
            </div>
            <div />
          </form>
        </Segment>
      </div>
    );
  }
}

export default NewNote;
