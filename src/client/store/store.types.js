// @flow

import type { SessionStateType } from './session/session.types';
import type { UserStateType } from './user/user.types';

export type StateType = {|
  session: SessionStateType,
  user: UserStateType,
|};
