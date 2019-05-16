import React, { Component } from "react";
import { Button } from "semantic-ui-react";

class EditingNote extends Component {
  updateNote = key => {
    const newText = this._inputElement.value;
    this.props.updateNote(key, newText);
  };
  render() {
    const { handleUpdate, inputValue, note } = this.props;

    return (
      <div className="ui input fluid focus">
        <input
          autoFocus
          ref={a => (this._inputElement = a)}
          value={inputValue}
          onChange={handleUpdate}
          type="text"
        />
        <Button
          type="submit"
          className="ui inverted violet"
          id="add-btn"
          onClick={() => {
            this.updateNote(note.key);
          }}
        >
          <div>
            <i className="right arrow icon" />
          </div>
        </Button>
      </div>
    );
  }
}

export default EditingNote;
