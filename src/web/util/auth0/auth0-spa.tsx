import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import createAuth0Client, { Auth0Client, GetTokenSilentlyOptions, RedirectLoginOptions } from '@auth0/auth0-spa-js';
import Cookies from 'universal-cookie';

import env from '../../../config';
import { TOKEN_URL } from '../../../common/util/auth0/role.constants';
import { UserStateType } from '../../types/state.types';
import { Auth0Context } from './auth0-context';
import { COOKIE_JWT_PAYLOAD } from './auth0.constants';
import { updateAuthentication, setLoading, clearLoading } from '../../client/store/session/session.slice';
import { updateUser } from '../../client/store/user/user.slice';
import { Auth0ProviderType } from '../../types/auth0.types';

const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState(
  {},
  document.title,
  window.location.pathname,
);

const setCookies = (newCookies?: unknown) => {
  const cookies = new Cookies();
  if (newCookies) {
    cookies.set(
      COOKIE_JWT_PAYLOAD,
      newCookies,
      {
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'none',
        secure: true,
      },
    );
  } else {
    cookies.remove(COOKIE_JWT_PAYLOAD);
  }
};

const noop = () => {};
const initialContext = {
  loginWithRedirect: noop,
  logout: noop,
  getTokenSilently: noop,
} as Auth0Client;

const Auth0Provider: React.FC<Auth0ProviderType> = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [auth0Client, setAuth0] = useState<Auth0Client>(initialContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth0 = async () => {
      dispatch(setLoading());
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
          exp: tokenClaims.exp || 0,
          user: {
            ...auth0User,
            context,
          },
        };
        setCookies(token);
        dispatch(updateAuthentication({ authenticated: true, expiration: token.exp}));
        dispatch(updateUser(token.user));
      } else {
        setCookies();
        dispatch(updateAuthentication({ authenticated: false, expiration: 0 }));
        dispatch(updateUser({} as UserStateType));
      }

      dispatch(clearLoading());
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const logout = async (...p: unknown[]) => {
    const logoutProps = {
      ...p,
      returnTo: env.host,
    };
    await auth0Client.logout(logoutProps);
    dispatch(updateAuthentication({ authenticated: false, expiration: 0 }));
    dispatch(updateUser({} as UserStateType));
    setCookies();
  };

  const login = (props: RedirectLoginOptions) => {
    return auth0Client.loginWithRedirect(props);
  };

  const getToken = (props: GetTokenSilentlyOptions) => {
    return auth0Client.getTokenSilently(props);
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
