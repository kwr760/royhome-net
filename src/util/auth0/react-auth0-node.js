/* eslint-disable react/prop-types */
// @flow

import React, { useState } from 'react';
import { Auth0Context } from './context';
import type { Auth0ProviderPropsType } from './types';

import hasNeededRole from './has-needed-role';

const Auth0Provider = ({
  children,
  context,
}: Auth0ProviderPropsType) => {
  const { jwt } = context;
  const { data: cxtData } = jwt;

  const [data] = useState(cxtData);

  return (
    <Auth0Context.Provider
      value={{
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
