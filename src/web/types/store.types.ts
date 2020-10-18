import { SessionStateType } from './session.types';
import { UserStateType } from './user.types';
import { ResumeStateType } from './resume.types';

export interface StateType {
  session?: SessionStateType;
  user?: UserStateType;
  resume?: ResumeStateType;
}

