import { ResumeType } from '../../types/resume.types';
import { UserStateType } from './state.types';

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

export interface SessionActionType {
  type: string;
  payload: {
    authenticated?: boolean;
    expiration?: number;
    isLoading?: boolean;
    darkMode?: string;
  }
}

export interface UserActionType {
  type: string;
  payload: {
    user: UserStateType;
  }
}
