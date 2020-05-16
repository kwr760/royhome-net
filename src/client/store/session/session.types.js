// @flow

export type SessionStateType = {|
  authenticated: boolean,
  expiration: number,
  isLoading: boolean,
|};

type UpdateAuthenticationPayloadType = {|
  authenticated: boolean,
  expiration: number,
|};

type UpdateLoadingPayloadType = {|
  isLoading: boolean,
|};

type UpdateAuthenticationActionType = {|
  type: 'UPDATE_AUTHENTICATION',
  payload: UpdateAuthenticationPayloadType,
|};
type UpdateLoadingActionType = {|
  type: 'UPDATE_LOADING',
  payload: UpdateLoadingPayloadType,
|};

export type SessionActionType = UpdateAuthenticationActionType | UpdateLoadingActionType
