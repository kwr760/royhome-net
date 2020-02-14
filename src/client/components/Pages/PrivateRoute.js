// import React, { useEffect } from 'react';
import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAuth0 } from '../../../util/auth0/context';

const PrivateRoute = ({
  component: Component, path, userRole, context, ...rest
}) => {
  // const { isAuthenticated, loginWithRedirect, userHasRole } = useAuth0();
  const { isAuthenticated, userHasRole } = useAuth0();

  // useEffect(() => {
  //   const needToLogin = async () => {
  // if (!isAuthenticated) {
  // await loginWithRedirect({
  //   appState: { targetUrl: path },
  // });
  // }
  // };
  // needToLogin();
  // }, [isAuthenticated, loginWithRedirect, path]);

  const render = (props) => {
    if (isAuthenticated === true && userRole.length > 0 && !userHasRole(userRole)) {
      return (
        <h1>
          Unauthorized - You need the following role to view this page:
          {' '}
          {userRole}
        </h1>
      );
    }

    return <Component {...props} context={context} />;
  };

  return <Route path={path} render={render} {...rest} />;
};


PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  userRole: PropTypes.string,
  context: PropTypes.shape(),
};

PrivateRoute.defaultProps = {
  userRole: '',
  context: {},
};

export default PrivateRoute;
