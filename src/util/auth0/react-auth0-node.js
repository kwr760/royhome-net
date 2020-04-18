/* eslint-disable react/prop-types */
// @flow

import React from 'react';
import { Auth0Context } from './context';
import type { Auth0ProviderPropsType } from './types';

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
