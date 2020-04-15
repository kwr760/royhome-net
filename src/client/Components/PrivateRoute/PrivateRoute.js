// @flow

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import { useAuth0 } from '../../../util/auth0/context';
import { type Props } from '../../types';
import isAuthenticated from '../../store/session/session.selector';

const PrivateRoute = ({
  component: Component, path, userRole = '', context, url, ...rest
}: Props) => {
  const { loginWithRedirect, userHasRole } = useAuth0();
  const authenticated = useSelector((state) => isAuthenticated(state, null));

  useEffect(() => {
    const needToLogin = async (target) => {
      if (!isAuthenticated) {
        await loginWithRedirect({
          appState: { targetUrl: target },
        });
      }
    };
    needToLogin(path);
  }, [authenticated, loginWithRedirect, path]);

  const render = (props) => {
    if (authenticated === true && userRole.length > 0 && !userHasRole(userRole)) {
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
