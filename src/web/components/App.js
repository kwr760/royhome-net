// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Auth from './Auth/Auth';
import Home from './Pages/Public/Home';
import Profile from './Pages/Private/Profile';
import Nav from './Pages/Nav';
import Callback from './Pages/Public/Callback';
import Public from './Pages/Public/Public';
import Resume from './Pages/Public/Resume';
import Private from './Pages/Private/Private';
import Courses from './Pages/Private/Courses';
import PrivateRoute from './Pages/PrivateRoute';
import AuthContext from './Auth/AuthContext';

/**
 * @return {string}
 */
function App({ history }) {
  const [tokenRenewalComplete] = useState(true);
  const [auth] = useState(new Auth(history));

  if (!tokenRenewalComplete) {
    return <div className="container-fluid">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={auth}>
      <Nav auth={auth} />
      <div className="body">
        <Route
          path="/"
          exact
          render={(props) => <Home auth={auth} {...props} />}
        />
        <Route
          path="/callback"
          render={(props) => (
            <Callback auth={auth} {...props} />
          )}
        />
        <PrivateRoute path="/profile" component={Profile} />
        <Route path="/resume" auth={auth} component={Resume} />
        <Route path="/public" auth={auth} component={Public} />
        <PrivateRoute path="/private" component={Private} />
        <PrivateRoute
          path="/courses"
          component={Courses}
          scopes={['read:courses']}
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
