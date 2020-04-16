// @flow

import type { Store } from 'redux';
import type { StateType } from './store/types';
import type { DataType } from '../server/rendering/types';

export type ContextType = {|
  jwt?: {|
    expiresAt: number,
    data: string,
    user: string,
  |},
  data?: DataType,
|};

export type AppPropsType = {|
  component: Object,
  context?: ContextType,
  store?: Store<StateType>,
  path: string,
  userRole?: string,
  url?: Object,
|};
