// @flow

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import { useAuth0 } from '@web/util/auth0/auth0-context';
import hasNeededRole from '@web/util/auth0/has-needed-role';
import { isAuthenticated } from '../../../store/session/session.selector';
import { getUser } from '../../../store/user/user.selector';

import type { PrivateRoutePropsType } from './private-route.types';

const PrivateRoute = ({
  component: Component, path, url, userRole = '', ...rest
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

    return <Component {...props} />;
  };

  return <Route path={path} render={render} {...rest} />;
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  userRole: PropTypes.string,
};

export default PrivateRoute;
