import React, { Component } from "react";
import { Button, Icon } from "semantic-ui-react";
import Signin from "./Signin";
import Register from "./Register";
import "./Header.css";
import { userInfo } from "os";

class Header extends Component {
  onFormSubmit = e => {
    e.preventDefault();
    console.log(this._inputElement.value);
  };

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
                onClick={this.props.sortNotesNew}
              >
                <Icon name="arrow up" />
              </Button>
              <Button
                className="ui inverted violet"
                type="submit"
                id="sortold-btn"
                onClick={this.props.sortNotesOld}
              >
                <Icon name="arrow down" />
              </Button>
            </Button.Group>
            <Button
              className="ui inverted violet"
              type="submit"
              id="add-btn"
              onClick={this.props.deleteNote}
            >
              <div>
                <Icon name="trash alternate" />
              </div>
            </Button>
            {!!this.props.authenticated ? (
              <Button
                className="ui inverted red"
                type="submit"
                id="add-btn"
                onClick={this.props.signOut}
              >
                <div>
                  <Icon name="sign out" />
                </div>
              </Button>
            ) : (
              <div>
                <Signin
                  authenticate={this.props.authenticate}
                  getUser={this.props.getUser}
                />
                <Register
                  authenticate={this.props.authenticate}
                  getUser={this.props.getUser}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
