import React from 'react';
import { Auth0Context } from './auth0-context';
import { Auth0ProviderType } from '../../types/auth0.types';

const Auth0Provider: React.FC<Auth0ProviderType> = ({
  children,
}) => (
  <Auth0Context.Provider
    value={{
      logout: () => {},
      login: () => {},
      getToken: () => undefined,
    }}
  >
    {children}
  </Auth0Context.Provider>
);

export default Auth0Provider;
