import React, {Component} from 'react';
import { Button, Icon, Modal, Segment } from 'semantic-ui-react';
import './Header.css';

class Header extends Component {

  onFormSubmit = (e) => {
    e.preventDefault();
    console.log(this._inputElement.value);
  }

  render(props) {
    return (
      <div className="ui padded segment" id="header">
        <div className="header-grid">
          <div className="h-col-1">
            <h1>Color Notes</h1>
          </div>
          <div className="h-col-2">
            <Button.Group>
              <Button 
                className="ui inverted violet"
                type="submit" 
                id="sortnew-btn" 
                onClick={this.props.sortNotesNew}>
              <Icon name="arrow up" />
              </Button>
              <Button 
                className="ui inverted violet"
                type="submit" 
                id="sortold-btn" 
                onClick={this.props.sortNotesOld}>
                <Icon name="arrow down" />
              </Button>
            </Button.Group>
            <Button 
              className="ui inverted violet"
              type="submit" 
              id="add-btn" 
              onClick={this.props.deleteNote}>
                <div >
                <Icon name="trash alternate" />
                </div>
            </Button>  
            {!!this.props.authenticated
            ?
            <Button 
              className="ui inverted red"
              type="submit" 
              id="add-btn" 
              onClick={this.props.deleteNote}>
                <div >
                <Icon name="sign out" />
                </div>
            </Button>
            :
            <Modal trigger={
              <Button 
              className="ui inverted green"
              type="submit" 
              id="add-btn" 
              onClick={this.props.deleteNote}>
                <div >
                <Icon name="sign in" />
                </div>
              </Button>
            }>
            <Modal.Header className="ui center aligned">Sign In</Modal.Header>
              <Modal.Content image>
                <Modal.Description>
                <Segment className= "ui raised padded compact" id="note-input">
                  <form onSubmit={this.onFormSubmit} >
                    <div>
                      <div className="ui input focus new-note-input">
                        <input
                          ref={(a) => this._inputElement = a}
                          placeholder="name"
                          type="text"
                        />
                        <Button
                          type="submit" 
                          className="ui inverted violet"
                          id="add-btn" >
                            <div>
                              <i className="right arrow icon"></i>
                            </div>
                          
                        </Button>
                      </div>
                    </div>
                    <div>
                    </div>
                  </form>
                </Segment>
                </Modal.Description>
              </Modal.Content>
            </Modal>

            }
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
