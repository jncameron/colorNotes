import React, {Component} from 'react';
import './Notes.css'; 

class Notes extends Component {

  createNotes(note) {
    return <div className="note" key={note.key}>{note.text}</div>
  }

  render() {

    let noteEntries = this.props.entries;
    let listItems = noteEntries.map(this.createNotes);
    return(
      <div className="note-list">
        {listItems}
      </div>
    );
  }
}

export default Notes;