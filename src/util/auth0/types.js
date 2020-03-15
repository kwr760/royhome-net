// @flow

export type TokenData = {
  role?: string,
  ...
};
export type Auth0ProviderProps = {|
  children: Object,
  context: Object,
  onRedirectCallback: Function,
  audience?: string,
  client_id: string,
  domain: string,
  redirect_uri?: string,
|};
export type Auth0Client = {
  loginWithPopup: Function,
  getIdTokenClaims: Function,
  handleRedirectCallback: Function,
  getUser: Function,
  logout: Function,
  getTokenWithPopup: Function,
  getTokenSilently: Function,
  loginWithRedirect: Function,
  ...
};
