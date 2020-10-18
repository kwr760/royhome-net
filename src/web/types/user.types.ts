export interface UserContextType {
  role?: string;
}

export interface UserStateType {
  context?: UserContextType;
  nickname?: string,
  name?: string;
  email?: string;
  picture?: string;
}

export interface UpdateUserPayloadType {
  user: UserStateType;
}

export interface UpdateUserActionType {
  type: string;
  payload: UpdateUserPayloadType;
}

export type UserActionType = UpdateUserActionType;
