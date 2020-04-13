// @flow

import type { Action } from 'redux';
import type { State } from '../../types';

const sessionReducer = (state: State = {}, action: Action<string>): State => {
  switch (action.type) {
  case 'EMPTY':
    return state;
  default:
    return state;
  }
};

export default sessionReducer;
