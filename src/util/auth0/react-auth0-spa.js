/* eslint-disable react/prop-types */
// @flow
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import Cookies from 'universal-cookie';

import { Auth0Context } from './context';
import { COOKIE_JWT_PAYLOAD, TOKEN_URL } from './constants';
import hasNeededRole from './has-needed-role';
import env from '../../config';
import type { Auth0ProviderProps, Auth0Client } from './types';

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
  context,
  ...initOptions
}: Auth0ProviderProps) => {
  const { jwt } = context;
  const { expiresAt, user: cxtUser, data: cxtData } = jwt;

  const currTime = new Date().getTime();
  const [isAuthenticated, setIsAuthenticated] = useState(currTime < expiresAt);
  const [user, setUser] = useState(cxtUser);
  const [data, setData] = useState(cxtData);
  const [auth0Client, setAuth0]: [Auth0Client, Function] = useState({});
  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      setLoading(true);
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes('code=')) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const authenticated = await auth0FromHook.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        const auth0User = await auth0FromHook.getUser();
        setUser(auth0User);
        const tokenClaims = await auth0FromHook.getIdTokenClaims();
        const token = {
          exp: tokenClaims.exp,
          user: auth0User,
          data: tokenClaims[TOKEN_URL],
        };
        setData(token.data);
        setCookies(token);
      } else {
        setUser({});
        setData({});
        setCookies();
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const auth0User = await auth0Client.getUser();
    setUser(auth0User);
    const tokenClaims = await auth0Client.getIdTokenClaims();
    const token = {
      exp: tokenClaims.exp,
      user: auth0User,
      data: tokenClaims[TOKEN_URL],
    };
    setData(token.data);
    setCookies(token);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const auth0User = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(auth0User);
  };

  const logout = (...props) => {
    setIsAuthenticated(false);
    setUser({});
    setData({});
    setCookies();
    const logoutProps = {
      ...props,
      returnTo: env.host,
    };
    auth0Client.logout(logoutProps);
  };

  const getIdTokenClaims = (...p) => {
    if (!_.isEmpty(auth0Client)) {
      return auth0Client.getIdTokenClaims(...p);
    }
    return undefined;
  };

  const loginWithRedirect = (...p) => {
    if (!_.isEmpty(auth0Client)) {
      return auth0Client.loginWithRedirect(...p);
    }
    return undefined;
  };

  const getTokenSilently = (...p) => {
    if (!_.isEmpty(auth0Client)) {
      return auth0Client.getTokenSilently(...p);
    }
    return undefined;
  };

  const getTokenWithPopup = (...p) => {
    if (!_.isEmpty(auth0Client.getTokenWithPopup)) {
      return auth0Client.getTokenWithPopup(...p);
    }
    return undefined;
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        logout,
        getIdTokenClaims,
        loginWithRedirect,
        getTokenSilently,
        getTokenWithPopup,
        userHasRole: (role) => hasNeededRole(role, data),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

export default Auth0Provider;
