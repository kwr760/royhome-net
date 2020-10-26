import { ResumeType } from '../../types/resume.types';

export interface SessionStateType  {
  authenticated?: boolean;
  expiration?: number;
  isLoading?: boolean;
  darkMode?: string;
}
export interface UserStateType {
  context?: {
    role?: string;
  };
  nickname?: string,
  name?: string;
  email?: string;
  picture?: string;
}
export interface UserSliceType {
  user: UserStateType;
}
export type ResumeStateType = {
  email: string;
  resume?: ResumeType;
  error?: string;
}
export interface StateType {
  session?: SessionStateType;
  user?: UserStateType;
  resume?: ResumeStateType;
}
