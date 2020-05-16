// @flow

type GetResumePayloadType = {|
  isLoading: boolean,
|};

export type ResumeActionType = {|
  type: 'GET_RESUME',
  status: string,
  payload: GetResumePayloadType,
|};

export type ResumeStateType = {|
  owner?: {|
    id: number,
    userId: number,
    name: string,
  |},
  contact?: {|
    id: number,
    userId: number,
    phone: string,
    email: string,
    displayPhone: boolean,
  |},
  address?: {|
    id: number,
    userId: number,
    address: string,
  |}
|};
