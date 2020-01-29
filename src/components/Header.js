import React, { Component } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
// import Button from "react-bootstrap/Button";

import Signin from "./Signin";
import Register from "./Register";
import "./Header.css";

class Header extends Component {
  onFormSubmit = e => {
    e.preventDefault();
  };

  render(props) {
    return (
      <nav className="navbar navbar-expand-lg" id="header">
        <h1>Color Notes</h1>
        <a className="nav-link active" href="#">
          Log In
        </a>
        {/* <ButtonGroup> */}
        <Button
          type="submit"
          id="sortold-btn"
          onClick={this.props.sortNotesOld}
        >
          <img
            src="/up-arrow.svg"
            alt=""
            width="20"
            height="20"
            title="sort old"
          />
        </Button>
        <Button type="submit" id="add-btn" onClick={this.props.sortNotesNew}>
          <img
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
      </nav>
    );
  }
}

export default Header;
