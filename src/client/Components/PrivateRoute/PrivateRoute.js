// @flow

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import { useAuth0 } from '../../../util/auth0/context';
import type { PrivateRoutePropsType } from './types';
import { isAuthenticated } from '../../store/session/session.selector';
import { getUser } from '../../store/user/user.selector';
import hasNeededRole from '../../../util/auth0/has-needed-role';

const PrivateRoute = ({
  component: Component, path, userRole = '', context, url, ...rest
}: PrivateRoutePropsType) => {
  const { login } = useAuth0();
  const authenticated = useSelector((state) => isAuthenticated(state, null));
  const user = useSelector((state) => getUser(state, null));

  useEffect(() => {
    const needToLogin = async (target) => {
      if (!authenticated) {
        await login({
          appState: { targetUrl: target },
        });
      }
    };
    needToLogin(path);
  }, [authenticated, login, path]);

  const render = (props) => {
    if (authenticated === true && userRole.length > 0 && !hasNeededRole(userRole, user.context)) {
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
