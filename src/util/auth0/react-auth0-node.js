/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Auth0Context } from './context';

import hasNeededRole from './has-needed-role';

const Auth0Provider = ({
  children,
  context,
}) => {
  const { jwt } = context;
  const { expiresAt, user: cxtUser, data: cxtData } = jwt;

  const currTime = new Date().getTime();
  const [isAuthenticated] = useState(currTime < expiresAt);
  const [user] = useState(cxtUser);
  const [data] = useState(cxtData);
  const [loading] = useState(false);
  const [popupOpen] = useState(false);


  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup: () => {},
        handleRedirectCallback: () => {},
        getIdTokenClaims: () => {},
        loginWithRedirect: () => {},
        getTokenSilently: () => {},
        getTokenWithPopup: () => {},
        logout: () => {},
        userHasRole: (role) => hasNeededRole(role, data),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

export default Auth0Provider;
