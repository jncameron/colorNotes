import React, { Component } from 'react';
import { Switch, Router, Route, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NotFoundPage from '../components/NotFoundPage';
import App from '../App';
import GuestApp from '../GuestApp';

export const history = createHistory();



class AppRouter extends Component {

  constructor(props) {
    super(props);
    this.state = {authenticated: false}
  }

  authenticate = (loggedin) => {
    this.setState({authenticated: loggedin})
  }

  render() {
    return (
      <Router history={history}>
          <div>
            <Switch>
              <Route path="/guest" render={(props)=> 
                this.state.authenticated 
                  ?
                    <Redirect to="/mynotes/" />
                  : 
                    <GuestApp {...props} authenticated={this.state.authenticated} authenticate={this.authenticate} />
                }
              />
              <Route path="/mynotes" render={(props)=> 
                this.state.authenticated 
                  ?
                    <App {...props} authenticated={this.state.authenticated} />  
                  :
                    <Redirect to="/guest/" />
                }
              />
              <Route path="/" render={() => (
                this.state.authenticated 
                  ?
                  <Redirect to="/mynotes/" /> 
                  :
                  <Redirect to="/guest/"/> 
              )} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Router>
    )
  }
}

export default AppRouter;