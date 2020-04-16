// @flow

import type { ContextType } from '../../client/types';

const populateState = (context: ContextType) => {
  const { jwt = {} } = context;
  const { expiresAt = 0 } = jwt;
  return {
    session: {
      authenticated: (expiresAt > 0),
      expiration: -1,
    },
  };
};

export default populateState;
