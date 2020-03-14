// @flow

import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

import { useAuth0 } from '../../../util/auth0/context';
import { Props } from '../../types';

const PrivateRoute = ({
  component: Component, path, userRole, context, ...rest
}: Props) => {
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

export default PrivateRoute;
