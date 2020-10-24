import { combineReducers } from '@reduxjs/toolkit';

import sessionReducer from './session/session.slice';
import userReducer from './user/user.slice';
import resumeReducer from './resume/resume.slice';

const rootReducer = combineReducers({
  session: sessionReducer,
  user: userReducer,
  resume: resumeReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
