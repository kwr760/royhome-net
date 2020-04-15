// @flow

import { createSelector } from 'reselect';
import type { State } from '../types';
import type { SessionState } from './types';

const isAuthenticated = createSelector<State, null, boolean, SessionState>(
  (state: State) => state.session,
  (session: SessionState) => session.authenticated,
);

export default isAuthenticated;
