// @flow

import React, { useContext } from 'react';

export const Auth0Context = React.createContext<any>();
export const useAuth0 = () => useContext(Auth0Context);
