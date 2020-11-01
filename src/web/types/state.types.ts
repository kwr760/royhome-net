import { ContextType } from '../../types/context.types';
import { ResumeType } from '../../types/resume.types';
import { COOKIE_JWT_PAYLOAD } from '../util/auth0/auth0.constants';

export interface SessionStateType  {
  authenticated?: boolean;
  expiration?: number;
  isLoading?: boolean;
  darkMode?: string;
}
export interface UserStateType {
  context?: ContextType,
  nickname?: string,
  name?: string;
  email?: string;
  picture?: string;
}
export interface ResumeStateType {
  email: string,
  resumes: {
    [key: string]: ResumeType,
  },
  error?: string,
}

export interface StateType {
  session: SessionStateType;
  user: UserStateType;
  resume: ResumeStateType;
}

export interface CookieType {
  [COOKIE_JWT_PAYLOAD]?: string,
}
