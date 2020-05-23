// @flow

type GetResumePayloadType = {|
  email: string,
|};

type OwnerStateType = {|
  id: number,
  userId: number,
  name: string,
|};

type ContactStateType = {|
  id: number,
  userId: number,
  phone: string,
  email: string,
  displayPhone: boolean,
|};

type AddressStateType = {|
  id: number,
  userId: number,
  address: string,
|};

type ResumeType = {|
  resume?: Object,
|};

export type ResumeActionType = {|
  type: 'GET_RESUME',
  status: string,
  payload: GetResumePayloadType,
  data?: ResumeType,
  error?: string,
|};

export type ResumeStateType = {|
  activeResume: string,
  owner?: OwnerStateType,
  contact?: ContactStateType,
  address?: AddressStateType,
  error?: string,
|};
