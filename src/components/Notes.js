import React, {Component} from 'react';
import { Transition, List, TransitionGroup } from 'semantic-ui-react';
import Tilt from 'react-tilt';

import './Notes.css'; 

class Notes extends Component {

  createNotes = (note) => {

    
    let colors = ['red','orange','yellow','olive','green','teal','blue','violet','purple','pink'];
    let randomColor = colors[note.key.toString().slice(-1)[0]];
    return (
        note.completed === false
        ?
        <Tilt className={Tilt}>
          <div 
          onClick={() => this.completed(note.key)} 
          id="new-note" 
          className={'note ui inverted ' + randomColor + ' segment raised Tilt-inner'} 
          key={note.key}><strong>{note.text}</strong>
          </div>
        </Tilt>
        :
        <Tilt className={Tilt}>
          <div 
          onClick={() => this.completed(note.key)} 
          id="new-note" 
          className={'note ui inverted segment grey raised Tilt-inner completed'} 
          key={note.key}>{note.text}
          </div>
        </Tilt>
    )
  }

  delete = (key) => {

    this.props.delete(key);
  }

  completed = (key) => {
    this.props.complete(key);
  }

  render() {
    const hide = 50;
    const show = 500;
    let noteEntries = this.props.entries;
    let listItems = noteEntries.map(this.createNotes);
    
    return(
      <div className="note-list ui equal width divided grid" >
        <Transition.Group duration={{hide, show}} transition='jiggle' visible={true}>
            {listItems}
        </Transition.Group>
      </div>
    );
  }
}

export default Notes;