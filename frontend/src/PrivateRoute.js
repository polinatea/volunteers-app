import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('authToken')
      ? <Component {...props} />
      : <Navigate to='/login' />
  )} />
);

export default PrivateRoute;