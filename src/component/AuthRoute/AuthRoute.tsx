import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { isAuthenticated } from '../../services/storage';

function AuthRoute(props: RouteProps) {
  if (!isAuthenticated()) {
    return <Redirect to="/signin" />;
  }

  return <Route {...props} />;
}

export default AuthRoute;
