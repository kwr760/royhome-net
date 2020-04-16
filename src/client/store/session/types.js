// @flow

export type SessionStateType = {|
  authenticated: boolean,
  expiration: number,
|};

export type UpdateAuthenticationActionType = {|
  type: string,
  meta: {|
    authenticated: boolean,
    expiration: number,
  |},
|};
