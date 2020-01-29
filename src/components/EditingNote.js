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
        <div className="d-flex flex-row" style={{ margin: "10px" }}>
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
              <img
                src="/edit.svg"
                alt=""
                width="20"
                height="20"
                title="sort old"
              />
            </div>
          </button>
        </div>
      </form>
    );
  }
}

export default EditingNote;
