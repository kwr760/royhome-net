// @flow

export type UserStateType = {
  name?: string,
  email?: string,
  picture?: string,
  ...
};

type UpdateUserPayload = {|
  user: {
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
