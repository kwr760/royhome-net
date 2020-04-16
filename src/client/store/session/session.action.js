// @flow

import type { Action } from 'redux';

import SESSION from './constants';

const updateAuthentication = (authenticated: boolean, expiration: number): Action<string> => ({
  type: SESSION.UPDATE_AUTHENTICATION,
  meta: {
    authenticated,
    expiration,
  },
});

export default updateAuthentication;
