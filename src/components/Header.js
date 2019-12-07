import React, { Component } from "react";

import Signin from "./Signin";
import Register from "./Register";
import "./Header.css";

class Header extends Component {
  onFormSubmit = e => {
    e.preventDefault();
  };

  render(props) {
    return (
      <div className="container" id="header">
        <div className="row">
          <div className="col-sm">
            <h1>Color Notes</h1>
          </div>
          <div className="col-sm">
            <div className="btn-group" role="group">
              <button
                className="btn btn-info"
                type="submit"
                id="sortnew-btn"
                onClick={this.props.sortNotesNew}
              >
                {/* <Icon name="arrow up" /> */}
              </button>
              <button
                className="btn btn-info"
                type="submit"
                id="sortold-btn"
                onClick={this.props.sortNotesOld}
              >
                {/* <Icon name="arrow down" /> */}
              </button>
            </div>
            <button
              className="btn btn-info"
              type="submit"
              id="add-btn"
              onClick={this.props.deleteNote}
            >
              <div>{/* <Icon name="trash alternate" /> */}</div>
            </button>
            {!!this.props.authenticated ? (
              <button
                className="btn btn-danger"
                type="submit"
                id="add-btn"
                onClick={this.props.signOut}
              >
                <div>{/* <Icon name="sign out" /> */}</div>
              </button>
            ) : (
              <div>
                <Signin
                  authenticate={this.props.authenticate}
                  getUser={this.props.getUser}
                  getUserToken={this.props.getUserToken}
                />
                <Register
                  authenticate={this.props.authenticate}
                  getUser={this.props.getUser}
                  getUserToken={this.props.getUserToken}
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
