// @flow

type GetResumePayloadType = {|
  email: string,
|};

export type OwnerType = {|
  name: string,
|} | {||};

export type ContactType = {|
  phone: string,
  email: string,
  displayPhone: boolean,
|} | {||};

export type AddressType = {|
  address: string,
|} | {||};

export type SummaryType = {|
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
