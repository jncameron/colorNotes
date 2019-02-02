import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import './Header.css';

const Header = ({sortNotesNew, sortNotesOld, deleteNote, authenticated}) => {
  return (
    <div className="ui padded segment" id="header">
      <div className="header-grid">
        <div className="h-col-1">
          <h1>Color Notes</h1>
          {!!authenticated
          ?
          <h4>Logged In!</h4>
          :
          <h4>Logged Out!</h4>

          }
        </div>
        <div className="h-col-2">
          <Button.Group>
            <Button 
              className="ui inverted violet"
              type="submit" 
              id="sortnew-btn" 
              onClick={sortNotesNew}>
            <Icon name="arrow up" />
            </Button>
            <Button 
              className="ui inverted violet"
              type="submit" 
              id="sortold-btn" 
              onClick={sortNotesOld}>
              <Icon name="arrow down" />
            </Button>
          </Button.Group>
          <Button 
            className="ui inverted violet"
            type="submit" 
            id="add-btn" 
            onClick={deleteNote}>
              <div >
              <Icon name="trash alternate" />
              </div>
          </Button>  
        </div>
      </div>
    </div>
  )
}

export default Header;
