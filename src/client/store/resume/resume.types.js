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

export type SkillItemType = {|
  id: number,
  position: number,
  name: string,
|} | {||};

export type SkillsType = {|
  id: number,
  position: number,
  name: string,
  items: [SkillItemType],
|} | {||};

export type ExperienceItemType = {|
  id: number,
  position: number,
  type: string,
  item: string,
|} | {||};

export type ExperienceType = {|
  id: number,
  position: number,
  title: string,
  company: string,
  startDate: string,
  endDate: string,
  description: [ExperienceItemType],
  bullets: [ExperienceItemType],
  techs: [ExperienceItemType],
|} | {||};

export type EducationType = {|
  degreee: string,
  school: string,
  graduationDate: string,
|} | {||};

export type ResumeType = {|
  owner: OwnerType,
  contact: ContactType,
  address: AddressType,
  summary: SummaryType,
  skills: [SkillsType],
  experience: [ExperienceType],
  education: [EducationType],
|} | {||};

export type ResumeActionType = {|
  type: 'GET_RESUME',
  status: string,
  payload: GetResumePayloadType,
  data?: {|
    resume: ResumeType,
  |},
  error?: string,
|};

export type ResumeStateType = {|
  activeResume: string,
  [string]: ResumeType,
  error?: string,
|};