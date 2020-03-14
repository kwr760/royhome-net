export type TokenData = {
  role?: string,
};
export type Auth0ProviderProps = {
  children: Object,
  context: Object,
};
export type Auth0Client = {
  loginWithPopup: Function,
  getIdTokenClaims: Function,
  handlerRedirectCallback: Function,
  getUser: Function,
  logout: Function,
};
