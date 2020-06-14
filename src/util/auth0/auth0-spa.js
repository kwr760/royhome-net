/* eslint-disable react/prop-types */
// @flow
import { isEmpty } from 'lodash';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import createAuth0Client from '@auth0/auth0-spa-js';
import Cookies from 'universal-cookie';

import { Auth0Context } from './auth0-context';
import { COOKIE_JWT_PAYLOAD, TOKEN_URL } from './auth0.constants';
import env from '../../config';
import type { Auth0ProviderPropsType, Auth0ClientType } from './auth0.types';
import { updateAuthentication, updateLoading } from '../../client/store/session/session.action';
import { updateUser } from '../../client/store/user/user.action';

const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState(
  {},
  document.title,
  window.location.pathname,
);

const setCookies = (newCookies) => {
  const cookies = new Cookies();
  if (newCookies) {
    cookies.set(
      COOKIE_JWT_PAYLOAD,
      newCookies,
      { maxAge: 60 * 60 * 24 * 7 },
    );
  } else {
    cookies.remove(COOKIE_JWT_PAYLOAD);
  }
};

const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}: Auth0ProviderPropsType) => {
  const [auth0Client, setAuth0]: [Auth0ClientType, Function] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth0 = async () => {
      dispatch(updateLoading(true));
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const authenticated = await auth0FromHook.isAuthenticated();
      if (authenticated) {
        const auth0User = await auth0FromHook.getUser();
        const tokenClaims = await auth0FromHook.getIdTokenClaims();
        const context = tokenClaims[TOKEN_URL];
        const token = {
          exp: tokenClaims.exp,
          user: {
            ...auth0User,
            context,
          },
        };
        setCookies(token);
        dispatch(updateAuthentication(true, token.exp));
        dispatch(updateUser(token.user));
      } else {
        setCookies();
        dispatch(updateAuthentication(false, 0));
        dispatch(updateUser({}));
      }

      dispatch(updateLoading(false));
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const logout = async (...props) => {
    const logoutProps = {
      ...props,
      returnTo: env.host,
    };
    await auth0Client.logout(logoutProps);
    dispatch(updateAuthentication(false, 0));
    dispatch(updateUser({}));
    setCookies();
  };

  const login = (...p) => ((isEmpty(auth0Client)) ? undefined : auth0Client.loginWithRedirect(...p));

  const getToken = (...p) => {
    if (!isEmpty(auth0Client)) {
      return auth0Client.getTokenSilently(...p);
    }
    return undefined;
  };

  return (
    <Auth0Context.Provider
      value={{
        logout,
        login,
        getToken,
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

export default Auth0Provider;
