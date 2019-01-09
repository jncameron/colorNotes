import React, {Component} from 'react';
import './Notes.css'; 

class Notes extends Component {

  constructor(props) {
    super(props);
    this.createNotes = this.createNotes.bind(this);

  }

  createNotes(note) {

    
    let colors = ['red','orange','yellow','olive','green','teal','blue','violet','purple','pink'];
    let randomColor = colors[note.key.toString().slice(-1)[0]];
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