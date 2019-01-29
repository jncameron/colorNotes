import React, {Component} from 'react';
import Tilt from 'react-tilt';

import './Notes.css'; 

class Notes extends Component {

  createNotes = (note) => {
    
    let colors = ['red','orange','yellow','olive','green','teal','blue','violet','purple','pink'];
    let randomColor = colors[note.key.toString().slice(-1)[0]];
    return (
        note.completed === false
        ?
        (
          (window.innerWidth > 600 
          ?
        <Tilt className="Tilt" key={note.key}>
          <div 
          onClick={() => this.completed(note.key)} 
          id="new-note" 
          className={'note ui inverted ' + randomColor + ' segment raised Tilt-inner'} 
          ><strong>{note.text}</strong>
          </div>
        </Tilt>
          :
          <div 
          onClick={() => this.completed(note.key)} 
          id="new-note" 
          className={'note ui inverted ' + randomColor + ' segment raised Tilt-inner'} 
          ><strong>{note.text}</strong>
          </div>
          ))

        : 

            ( window.innerWidth > 600 
            ?
            <Tilt className="Tilt" key={note.key} >
              <div 
              onClick={() => this.delete(note.key)} 
              id="new-note" 
              className={'note ui inverted segment grey raised Tilt-inner completed'} 
              >{note.text}
              </div>
            </Tilt>
            :
              <div 
              onClick={() => this.delete(note.key)} 
              id="new-note" 
              className={'note ui inverted segment grey raised Tilt-inner completed'} 
              >{note.text}
              </div>
          )

    )
  }

  delete = (key) => {

    this.props.delete(key);
  }

  completed = (key) => {
    this.props.complete(key);
  }

  render() {
    let noteEntries = this.props.entries;
    let listItems = noteEntries.map(this.createNotes);
    
    return(
      <div className="note-list ui equal width divided grid" >
            {listItems}
      </div>
    );
  }
}

export default Notes;