import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Auth from './Auth/Auth';
import Context from './Context';
import Nav from './Pages/Nav';
import Home from './Pages/Public/Home';
import Resume from './Pages/Public/Resume';
import PrivateRoute from './Pages/PrivateRoute';
import Profile from './Pages/Private/Profile';
import Private from './Pages/Private/Private';
import Courses from './Pages/Private/Courses';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

/**
 * @return {string}
 */
function App({ history, context }) {
  const [auth] = useState(new Auth());
  const { jwt } = context;
  const { expiresAt, data } = jwt;
  auth.set({ history, expiresAt, data });
  const [tokenRenewalComplete, setTokenRenewalComplete] = useState(auth.isAuthenticated());

  useEffect(() => {
    auth.renewToken(() => setTokenRenewalComplete(true));
  }, [auth]);

  if (!tokenRenewalComplete) {
    return <div className="container-fluid">Loading...</div>;
  }

  return (
    <Context.Provider value={auth}>
      <Nav />
      <div className="body">
        <Route
          path="/"
          exact
          render={(props) => <Home {...props} />}
        />
        <PrivateRoute path="/profile" component={Profile} />
        <Route path="/resume" component={Resume} />
        <PrivateRoute path="/private" component={Private} />
        <PrivateRoute
          path="/courses"
          component={Courses}
          userRole="engineer"
        />
      </div>
    </Context.Provider>
  );
}

App.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape.isRequired,
  }).isRequired,
  context: PropTypes.shape({
    jwt: PropTypes.shape({
      expiresAt: PropTypes.number,
      data: PropTypes.shape(),
    }),
  }),
};

App.defaultProps = {
  context: {},
};

export default App;
