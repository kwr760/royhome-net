import React, { useContext } from 'react';
import { Auth0ContextType } from '../../types/auth0.types';

export const Auth0Context = React.createContext<Auth0ContextType>({});
export const useAuth0 = (): Auth0ContextType => useContext(Auth0Context);
