// @flow

export type SessionState = {|
  authenticated: boolean,
  expiration: number,
|};

export type UpdateAuthenticationAction = {|
  type: string,
  meta: {|
    authenticated: boolean,
    expiration: number,
  |},
|};
