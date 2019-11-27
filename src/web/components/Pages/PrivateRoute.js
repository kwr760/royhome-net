import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../Auth/AuthContext';

const PrivateRoute = ({ component: Component, userRole, ...rest }) => {
  const { isAuthenticated, userHasRole, login } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated()) {
          return login();
        }

        if (userRole.length > 0 && !userHasRole(userRole)) {
          return (
            <h1>
              Unauthorized - You need the following role to view this page:
              {' '}
              {userRole}
            </h1>
          );
        }

        return <Component {...props} />;
      }}
    />
  );
};


PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  userRole: PropTypes.string,
};

PrivateRoute.defaultProps = {
  userRole: '',
};

export default PrivateRoute;
