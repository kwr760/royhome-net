import { ResumeType } from '../../types/resume.types';

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
