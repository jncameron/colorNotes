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
          Old-New
        </Button>
        <Button type="submit" id="add-btn" onClick={this.props.deleteNote}>
          New-Old
        </Button>
        <Button type="submit" id="add-btn" onClick={this.props.signOut}>
          <div>Sign Out</div>
        </Button>
        {/* </ButtonGroup> */}
      </nav>
    );
  }
}

export default Header;
