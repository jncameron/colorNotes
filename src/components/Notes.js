import React, {Component} from 'react';
import './Notes.css'; 

class Notes extends Component {

  createNotes(note) {

    let colors = ['red','orange','yellow','olive','green','teal','blue','violet','purple','pink'];
    let randomColor = colors[Math.floor(Math.random() * 10)];
    // document.getElementById('new-note').classList.add("note", "ui", "inverted", "green", "segment");
    return <div id="new-note" className={'note ui inverted ' + randomColor + ' segment'} key={note.key}>{note.text}</div>;
  }

  render() {

    let noteEntries = this.props.entries;
    let listItems = noteEntries.map(this.createNotes);
    return(
      <div className="note-list ui equal width divided grid">
        
        {listItems}
      </div>
    );
  }
}

export default Notes;