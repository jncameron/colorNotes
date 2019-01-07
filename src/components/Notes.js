import React, {Component} from 'react';

class Notes extends Component {

  createNotes(note) {
    return <li key={note.key}>{note.text}</li>
  }

  render() {

    let noteEntries = this.props.entries;
    let listItems = noteEntries.map(this.createNotes);
    return(
      <ul className="note-list">
        {listItems}
      </ul>
    );
  }
}

export default Notes;