import type { Store } from 'redux';
import type { StateType } from './store.types';
import type { UserStateType } from './user.types';

export interface ContextType {
  jwt?: {
    expiresAt: number;
    data: string;
    user: UserStateType;
  },
  data?: unknown;
}

export interface AppPropsType {
  component: unknown;
  store?: Store<StateType>;
  path: string;
  userRole?: string;
  url?: unknown;
}
