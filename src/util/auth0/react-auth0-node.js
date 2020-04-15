/* eslint-disable react/prop-types */
// @flow

import React, { useState } from 'react';
import { Auth0Context } from './context';
import { type Auth0ProviderProps } from './types';

import hasNeededRole from './has-needed-role';

const Auth0Provider = ({
  children,
  context,
}: Auth0ProviderProps) => {
  const { jwt } = context;
  const { user: cxtUser, data: cxtData } = jwt;

  const [user] = useState(cxtUser);
  const [data] = useState(cxtData);
  const [loading] = useState(false);

  return (
    <Auth0Context.Provider
      value={{
        user,
        loading,
        logout: () => {},
        loginWithRedirect: () => {},
        getTokenSilently: () => {},
        userHasRole: (role) => hasNeededRole(role, data),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

export default Auth0Provider;
