// @flow

import type { ContextType } from '../../client/types';
import type { StateType } from '../../client/store/types';

const populateState = (context: ContextType): StateType => {
  const { jwt = {} } = context;
  const { expiresAt = 0 } = jwt;
  return {
    session: {
      authenticated: (expiresAt > 0),
      expiration: -1,
      isLoading: false,
    },
    user: {},
  };
};

export default populateState;
