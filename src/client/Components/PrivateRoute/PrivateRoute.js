import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAuth0 } from '../../../util/auth0/context';

const PrivateRoute = ({
  component: Component, path, userRole, context, ...rest
}) => {
  const { isAuthenticated, loginWithRedirect, userHasRole } = useAuth0();

  useEffect(() => {
    const needToLogin = async (url) => {
      if (!isAuthenticated) {
        await loginWithRedirect({
          appState: { targetUrl: url },
        });
      }
    };
    needToLogin(path);
  }, [isAuthenticated, loginWithRedirect, path]);

  const render = (props) => {
    if (isAuthenticated === true && userRole.length > 0 && !userHasRole(userRole)) {
      return (
        <h3>
          {`Unauthorized - You need the following role to view this page: ${userRole}`}
        </h3>
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
  ]),
  userRole: PropTypes.string,
  context: PropTypes.shape(undefined),
};

PrivateRoute.defaultProps = {
  path: '',
  userRole: '',
  context: {},
};

export default PrivateRoute;
