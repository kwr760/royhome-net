// @flow

export type SessionStateType = {|
  authenticated: boolean,
  expiration: number,
  isLoading: boolean,
  darkMode: string,
|};

type UpdateAuthenticationPayloadType = {|
  authenticated: boolean,
  expiration: number,
|};
type UpdateLoadingPayloadType = {|
  isLoading: boolean,
|};
type UpdateDarkModePayloadType = {|
  darkMode: string,
|};

type UpdateAuthenticationActionType = {|
  type: 'UPDATE_AUTHENTICATION',
  payload: UpdateAuthenticationPayloadType,
|};
type UpdateLoadingActionType = {|
  type: 'UPDATE_LOADING',
  payload: UpdateLoadingPayloadType,
|};
type UpdateDarkModeActionType = {|
  type: 'UPDATE_DARKMODE',
  payload: UpdateDarkModePayloadType,
|};

export type SessionActionType = UpdateAuthenticationActionType | UpdateLoadingActionType | UpdateDarkModeActionType
