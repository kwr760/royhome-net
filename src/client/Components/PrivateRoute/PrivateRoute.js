// @flow

import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

import { useAuth0 } from '../../../util/auth0/context';
import { type Props } from '../../types';

const PrivateRoute = ({
  component: Component, path, userRole = '', context, url, ...rest
}: Props) => {
  const { isAuthenticated, loginWithRedirect, userHasRole } = useAuth0();

  useEffect(() => {
    const needToLogin = async (target) => {
      if (!isAuthenticated) {
        await loginWithRedirect({
          appState: { targetUrl: target },
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
