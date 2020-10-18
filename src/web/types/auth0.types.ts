import React from 'react';

export interface Auth0ProviderType {
  children: React.ReactNode;
  context?: Auth0ContextType;
  onRedirectCallback?: (string) => unknown;
  audience?: string;
  // eslint-disable-next-line camelcase
  client_id: string;
  domain: string;
  // eslint-disable-next-line camelcase
  redirect_uri?: string;
}
export interface Auth0ClientType {
  loginWithRedirect?: (...p: unknown[]) => unknown;
  logout?: (...p: unknown[]) => unknown;
  getTokenSilently?: (...p: unknown[]) => Promise<string>;
}
export interface Auth0ContextType {
  login?: (...p: unknown[]) => unknown;
  logout?: (...p: unknown[]) => unknown;
  getToken?: (...p: unknown[]) => Promise<string>;
  jwt?: {
    expiresAt: number,
    user: {
      name: string,
    },
    data: {
      key: string,
    },
  }
}
