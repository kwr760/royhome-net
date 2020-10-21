import { isEmpty } from 'lodash';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import createAuth0Client from '@auth0/auth0-spa-js';
import Cookies from 'universal-cookie';

import env from '../../../config';
import { TOKEN_URL } from '../../../common/util/auth0/role.constants';
import { Auth0Context } from './auth0-context';
import { COOKIE_JWT_PAYLOAD } from './auth0.constants';
import { updateAuthentication, updateLoading } from '../../client/store/session/session.action';
import { updateUser } from '../../client/store/user/user.action';
import { Auth0ClientType, Auth0ProviderType } from '../../types/auth0.types';

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

const Auth0Provider: React.FC<Auth0ProviderType> = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [auth0Client, setAuth0] = useState<Auth0ClientType>({});
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

  const getToken = (...p): Promise<string> => {
    if (!isEmpty(auth0Client)) {
      return auth0Client.getTokenSilently(...p);
    }
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
