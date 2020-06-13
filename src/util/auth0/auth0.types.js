// @flow

export type Auth0ProviderPropsType = {|
  children: Object,
  onRedirectCallback: Function,
  audience?: string,
  client_id: string,
  domain: string,
  redirect_uri?: string,
|};

export type Auth0ClientType = {
  loginWithRedirect: Function,
  logout: Function,
  getTokenSilently: Function,
  ...
};
