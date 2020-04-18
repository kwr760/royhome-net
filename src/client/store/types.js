// @flow

import type { SessionStateType } from './session/types';
import type { UserStateType } from './user/types';

export type StateType = {|
  session: SessionStateType,
  user: UserStateType,
|};
