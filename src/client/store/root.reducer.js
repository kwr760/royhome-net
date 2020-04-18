// @flow

import sessionReducer from './session/session.reducer';
import userReducer from './user/user.reducer';

const rootReducer = {
  session: sessionReducer,
  user: userReducer,
};

export default rootReducer;
