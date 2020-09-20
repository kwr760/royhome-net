// @flow

import type { Store } from 'redux';
import type { StateType } from './store/store.types';
import type { DataType } from '../server/rendering/rendering.types';
import type { UserStateType } from './store/user/user.types';

export type ContextType = {|
  jwt?: {|
    expiresAt: number,
    data: string,
    user: UserStateType,
  |},
  data?: DataType,
|};

export type AppPropsType = {|
  component: Object,
  store?: Store<StateType>,
  path: string,
  userRole?: string,
  url?: Object,
|};
