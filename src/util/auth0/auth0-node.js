/* eslint-disable react/prop-types */
// @flow

import React from 'react';
import { Auth0Context } from './auth0-context';
import type { Auth0ProviderPropsType } from './auth0.types';

const Auth0Provider = ({
  children,
}: Auth0ProviderPropsType) => (
  <Auth0Context.Provider
    value={{
      logout: () => {},
      login: () => {},
      getToken: () => {},
    }}
  >
    {children}
  </Auth0Context.Provider>
);

export default Auth0Provider;
