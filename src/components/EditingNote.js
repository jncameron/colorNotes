import React, { Component } from "react";

class EditingNote extends Component {
  updateNote = key => {
    const newText = this._inputElement.value;
    this.props.updateNote(key, newText);
  };
  render() {
    const { handleUpdate, inputValue, note } = this.props;

    return (
      <form className="ui input fluid focus">
        <input
          autoFocus
          ref={a => (this._inputElement = a)}
          value={inputValue}
          onChange={handleUpdate}
          type="text"
        />
        <button
          type="submit"
          className="btn btn-info"
          id="add-btn"
          onClick={() => {
            this.updateNote(note.key);
          }}
        >
          <div>
            <i className="right arrow icon" />
          </div>
        </button>
      </form>
    );
  }
}

export default EditingNote;
