// @flow

export type TokenData = {
  role?: string,
};
export type Auth0ProviderProps = {
  children: Object,
  context: Object,
  onRedirectCallback: Function,
};
export type Auth0Client = {
  loginWithPopup: Function,
  getIdTokenClaims: Function,
  handleRedirectCallback: Function,
  getUser: Function,
  logout: Function,
  getTokenWithPopup: Function,
  getTokenSilently: Function,
  loginWithRedirect: Function,
};
