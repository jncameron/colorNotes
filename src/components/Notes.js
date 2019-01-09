import React, {Component} from 'react';

import './Notes.css'; 

class Notes extends Component {

  createNotes = (note) => {

    
    let colors = ['red','orange','yellow','olive','green','teal','blue','violet','purple','pink'];
    let randomColor = colors[note.key.toString().slice(-1)[0]];
    return <div onClick={() => this.delete(note.key)} id="new-note" className={'note ui inverted ' + randomColor + ' segment raised'} key={note.key}><strong>{note.text}</strong></div>;
  }

  delete = (key) => {

    this.props.delete(key);
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