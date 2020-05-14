// @flow

// import SESSION from './constants';

export type SessionStateType = {|
  authenticated: boolean,
  expiration: number,
  isLoading: boolean,
|};

type UpdateAuthenticationPayload = {|
  authenticated: boolean,
  expiration: number,
|};

type UpdateLoadingPayload = {|
  isLoading: boolean,
|};

// type SessionActionTypes = $Keys<typeof SESSION>;

type UpdateAuthenticationActionType = {|
  type: 'UPDATE_AUTHENTICATION',
  payload: UpdateAuthenticationPayload,
|};
type UpdateLoadingActionType = {|
  type: 'UPDATE_LOADING',
  payload: UpdateLoadingPayload,
|};

export type SessionActionType = UpdateAuthenticationActionType | UpdateLoadingActionType
