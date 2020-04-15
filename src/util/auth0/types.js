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
  getUser: Function,
  logout: Function,
  getTokenSilently: Function,
  loginWithRedirect: Function,
  ...
};
