import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../Auth/AuthContext';

function PrivateRoute({ component: Component, userRole, ...rest }) {
  return (
    <AuthContext.Consumer>
      { (auth) => (
        <Route
          {...rest}
          render={(props) => {
            if (!auth.isAuthenticated()) {
              return auth.login();
            }

            if (userRole.length > 0 && !auth.userHasRole(userRole)) {
              return (
                <h1>
                  Unauthorized - You need the following role to view this page:
                  {' '}
                  {userRole}
                </h1>
              );
            }

            return <Component auth={auth} {...props} />;
          }}
        />
      )}
    </AuthContext.Consumer>
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  userRole: PropTypes.string,
};

PrivateRoute.defaultProps = {
  userRole: '',
};

export default PrivateRoute;
