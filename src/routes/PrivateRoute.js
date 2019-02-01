import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import Header from '../components/Header';

const isAuthenticated = true;

const PrivateRoute = ({ 

  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <div>
        {/* <Header /> */}
        <Component {...props}/>
      </div>
    ) : (
      <Redirect to="/guest" />
    )
    )}/>
);


export default PrivateRoute;