export interface OwnerType {
  name: string;
}

export interface ContactType {
  phone: string;
  email: string;
  displayPhone: boolean;
}

export interface AddressType {
  address: string;
}

export interface SummaryType {
  summary: string;
}

export interface SkillItemType {
  id: number;
  position: number;
  name: string;
}

export interface SkillsType {
  id: number;
  position: number;
  name: string;
  items: SkillItemType[];
}

export interface ExperienceItemType {
  id: number;
  position: number;
  type: string;
  item: string;
}

export interface ExperienceType {
  id: number;
  position: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: ExperienceItemType[];
  bullets: ExperienceItemType[];
  techs: ExperienceItemType[];
}

export interface EducationType {
  degree: string;
  school: string;
  graduationDate: string;
}

export interface ResumeType {
  owner: OwnerType;
  contact: ContactType;
  address: AddressType;
  summary: SummaryType;
  skills: SkillsType[];
  experience: ExperienceType[];
  education: EducationType[];
}

export type ResumeStateType = {
  email: string;
  resume?: ResumeType;
  error?: string;
}

export interface ResumeActionType {
  type: string;
  status: string;
  payload: {
    email?: string;
  };
  data?: {
    resume?: ResumeType;
  }
  error?: string;
}
