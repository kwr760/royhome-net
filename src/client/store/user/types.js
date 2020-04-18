// @flow

export type UserContextType = {
  role?: string,
  ...
};

export type UserStateType = {
  context?: UserContextType,
  name?: string,
  email?: string,
  picture?: string,
  ...
};

type UpdateUserPayload = {|
  user: {
    context?: UserContextType,
    name?: string,
    email?: string,
    picture?: string,
    ...
  }
|};

type UpdateUserActionType = {|
  type: 'UPDATE_USER',
  payload: UpdateUserPayload,
|};

export type UserActionType = UpdateUserActionType;
