import React, { Component } from "react";
import { Button } from "react-bootstrap";

import Signin from "./Signin";
import Register from "./Register";
import "./Header.css";

class Header extends Component {
  onFormSubmit = e => {
    e.preventDefault();
  };

  render(props) {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-default fixed-top"
        id="header"
      >
        <h1>Color Notes</h1>
        <a className="nav-link active" href="#">
          Log In
        </a>
        {/* <ButtonGroup> */}
        <Button
          variant="outline-primary"
          type="submit"
          id="sortold-btn"
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
          id="add-btn"
          variant="outline-primary"
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
        {this.props.authenticated && (
          <Button type="submit" id="add-btn" onClick={this.props.signOut} />
        )}
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
      </nav>
    );
  }
}

export default Header;
