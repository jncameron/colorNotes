import React, { Component } from "react";
import { Switch, Router, Route, Redirect } from "react-router-dom";
import Particles from "react-particles-js";
import params from "../particles";
import paramsMobile from "../particlesMobile";
import createHistory from "history/createBrowserHistory";
import NotFoundPage from "../components/NotFoundPage";
import App from "../App";
import GuestApp from "../GuestApp";

export const history = createHistory();

// const URL = "http://cnapi-env.gdmmdmsy82.ap-southeast-2.elasticbeanstalk.com/";

const URL = "http://localhost:8081/";

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: {},
      token: ""
    };
  }

  componentDidMount = () => {
    const bearer = `Bearer ${localStorage.getItem("authtoken")}`;
    fetch(`${URL}istoken`, {
      method: "post",
      headers: { "Content-Type": "application/json", Authorization: bearer }
    })
      .then(response => response.text())
      .then(text => {
        try {
          const user = JSON.parse(text);
          console.log("user: " + user);
          if (!!user._id) {
            this.getUser(user);
            this.authenticate(true);
          }
        } catch (err) {
          console.log(err);
        }
      });
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

  render() {
    return (
      <Router history={history}>
        <div>
          {window.innerWidth > 870 ? (
            <Particles className="particles" params={params} />
          ) : (
            <Particles className="particles" params={paramsMobile} />
          )}
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
