import React, { Component } from "react";
import { ButtonGroup, Button } from "react-bootstrap";

import Signin from "./Signin";
import Register from "./Register";
import "./Header.css";

class Header extends Component {
  constructor() {
    super();
    this.state = { showSignInModal: false, showSignUpModal: false };
  }

  onFormSubmit = e => {
    e.preventDefault();
  };

  signInModalShow = () => {
    this.setState({ showSignInModal: true, showSignUpModal: false });
  };

  signInModalHide = () => {
    this.setState({ showSignInModal: false, showSignUpModal: false });
  };

  signUpModalShow = () => {
    this.setState({ showSignInModal: false, showSignUpModal: true });
  };

  signUpModalHide = () => {
    this.setState({ showSignInModal: false, showSignUpModal: false });
  };

  render(props) {
    return (
      <nav className="navbar navbar-default fixed-top" id="header">
        <h1>Color Notes</h1>
        <ButtonGroup>
          <Button
            variant="outline-success"
            type="submit"
            id="add-btn"
            onClick={this.props.sortNotesOld}
          >
            <img
              style={{ filter: "invert(1)" }}
              src="/up-arrow.svg"
              alt=""
              width="20"
              height="20"
              title="sort old"
            />
          </Button>
          <Button
            type="submit"
            variant="outline-success"
            onClick={this.props.sortNotesNew}
          >
            <img
              style={{ filter: "invert(1)" }}
              src="/down-arrow.svg"
              alt=""
              width="20"
              height="20"
              title="sort new"
            />
          </Button>

          <Button
            className="ui inverted violet"
            type="submit"
            id="add-btn"
            variant="outline-danger"
            onClick={this.props.deleteNote}
          >
            <img
              style={{ filter: "invert(1)" }}
              src="/delete.svg"
              alt=""
              width="20"
              height="20"
              title="trash"
            />
          </Button>
          {this.props.authenticated ? (
            <Button
              variant="outline-primary"
              type="submit"
              id="add-btn"
              onClick={this.props.signOut}
            >
              <img
                style={{ filter: "invert(1)" }}
                src="/log-out.svg"
                alt=""
                width="20"
                height="20"
                title="sort old"
              />
            </Button>
          ) : (
            <Button
              variant="outline-primary"
              type="submit"
              id="add-btn"
              onClick={this.signInModalShow}
            >
              <img
                style={{ filter: "invert(1)" }}
                src="/log-in.svg"
                alt=""
                width="20"
                height="20"
                title="sort old"
              />
            </Button>
          )}
        </ButtonGroup>
        {this.state.showSignInModal && (
          <Signin
            switchToSignUp={this.signUpModalShow}
            show={this.state.showSignInModal}
            onHide={this.signInModalHide}
            authenticate={this.props.authenticate}
            getUser={this.props.getUser}
            getUserToken={this.props.getUserToken}
          />
        )}
        {this.state.showSignUpModal && (
          <Register
            switchToSignIn={this.signInModalShow}
            show={this.state.showSignUpModal}
            onHide={this.signUpModalHide}
            authenticate={this.props.authenticate}
            getUser={this.props.getUser}
            getUserToken={this.props.getUserToken}
          />
        )}
      </nav>
    );
  }
}

export default Header;
