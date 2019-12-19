import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Auth from './Auth/Auth';
import Home from './Pages/Public/Home';
import Profile from './Pages/Private/Profile';
import Nav from './Pages/Nav';
import Resume from './Pages/Public/Resume';
import Private from './Pages/Private/Private';
import Courses from './Pages/Private/Courses';
import PrivateRoute from './Pages/PrivateRoute';

import AuthContext from './Auth/AuthContext';

/**
 * @return {string}
 */
function App({ history }) {
  const [tokenRenewalComplete, setTokenRenewalComplete] = useState(false);
  const [auth] = useState(new Auth(history));

  useEffect(() => {
    auth.renewToken(() => setTokenRenewalComplete(true));
  }, [auth]);

  if (!tokenRenewalComplete) {
    return <div className="container-fluid">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={auth}>
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
    </AuthContext.Provider>
  );
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

export default App;
