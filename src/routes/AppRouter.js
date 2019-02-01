import React from 'react';
import { Switch, Router, Route, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NotFoundPage from '../components/NotFoundPage';
import App from '../App';
import GuestApp from '../GuestApp';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

let loggedIn = true;

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/guest" component={GuestApp} exact={true}/>
        <PrivateRoute path="/mynotes" component={App} />
        <Route exact path="/" render={() => (
          loggedIn 
            ? (
            <Redirect to="/mynotes/"/>
            ) 
            : (
            <Redirect to="/guests/"/> 
            )
          )} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;