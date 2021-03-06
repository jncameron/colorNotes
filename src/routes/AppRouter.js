import React, { Component } from "react";
import { Switch, Router, Route, Redirect } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import NotFoundPage from "../components/NotFoundPage";
import App from "../App";
import GuestApp from "../GuestApp";

export const history = createHistory();

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: {},
      token: "hmm"
    };
  }

  componentDidMount = () => {
    const bearer = `Bearer ${localStorage.getItem("authtoken")}`;
    if (bearer.length > 11) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}istoken`, {
        method: "post",
        headers: { "Content-Type": "application/json", Authorization: bearer }
      })
        .then(response => response.text())
        .then(text => {
          try {
            const user = JSON.parse(text);
            if (!!user._id) {
              this.getUser(user);
              this.authenticate(true);
            }
          } catch (err) {
            console.log(err);
          }
        });
    }
  };

  getUserToken = token => {
    this.setState({ token: token });
  };

  getUser = usr => {
    this.setState({ user: usr });
  };

  authenticate = loggedin => {
    this.setState({ authenticated: loggedin });
  };

  signOut = () => {
    this.setState({ user: {} });
    this.setState({ authenticated: false });
    localStorage.removeItem("authtoken");
  };

  retrieveToken = () => this.state.token;

  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route
              path="/guest"
              render={props =>
                this.state.authenticated ? (
                  <Redirect to="/mynotes/" />
                ) : (
                  <GuestApp
                    {...props}
                    authenticated={this.state.authenticated}
                    authenticate={this.authenticate}
                    getUser={this.getUser}
                    getUserToken={this.getUserToken}
                  />
                )
              }
            />
            <Route
              path="/mynotes"
              render={props =>
                this.state.authenticated ? (
                  <App
                    {...props}
                    authenticated={this.state.authenticated}
                    user={this.state.user}
                    signOut={this.signOut}
                    token={this.state.token}
                  />
                ) : (
                  <Redirect to="/guest/" />
                )
              }
            />
            <Route
              path="/"
              render={() =>
                this.state.authenticated ? (
                  <Redirect to="/mynotes/" />
                ) : (
                  <Redirect to="/guest/" />
                )
              }
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default AppRouter;
