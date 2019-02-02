import React from 'react';
import { Switch, Router, Route, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NotFoundPage from '../components/NotFoundPage';
import App from '../App';
import GuestApp from '../GuestApp';

export const history = createHistory();

let authenticated = false;

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/guest" render={(props)=> 
          authenticated 
            ?
              <Redirect to="/mynotes/" />
            : 
              <GuestApp {...props} authenticated={authenticated} />
          }
        />
        <Route path="/mynotes" render={(props)=> 
          authenticated 
            ?
              <App {...props} authenticated={authenticated} />  
            :
              <Redirect to="/guest/" />
          }
        />
        <Route path="/" render={() => (
          authenticated 
            ?
            <Redirect to="/mynotes/" /> 
            :
            <Redirect to="/guest/"/> 
        )} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;