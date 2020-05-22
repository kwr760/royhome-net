// @flow

import type { SessionStateType } from './session/session.types';
import type { UserStateType } from './user/user.types';
import type { ResumeStateType } from './resume/resume.types';

export type StateType = {|
  session: SessionStateType,
  user: UserStateType,
  resume: ResumeStateType,
|};
