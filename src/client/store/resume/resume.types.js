// @flow

type GetResumePayloadType = {|
  email: string,
|};

export type OwnerType = {|
  id: number,
  userId: number,
  name: string,
|} | {||};

export type ContactType = {|
  id: number,
  userId: number,
  phone: string,
  email: string,
  displayPhone: boolean,
|} | {||};

export type AddressType = {|
  id: number,
  userId: number,
  address: string,
|} | {||};

export type SummaryType = {|
  id: number,
  userId: number,
  summary: string,
|} | {||};

export type ResumeType = {|
  resume: {
    owner: OwnerType,
    contact: ContactType,
    address: AddressType,
    summary: SummaryType,
    ...
  },
|} | {||};

export type ResumeActionType = {|
  type: 'GET_RESUME',
  status: string,
  payload: GetResumePayloadType,
  data?: ResumeType,
  error?: string,
|};

export type ResumeStateType = {|
  activeResume: string,
  owner?: OwnerType,
  contact?: ContactType,
  address?: AddressType,
  summary?: SummaryType,
  error?: string,
|};
