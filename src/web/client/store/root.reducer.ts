import { sessionReducer } from './session/session.reducer';
import { userReducer } from './user/user.reducer';
import { resumeReducer } from './resume/resume.reducer';

const rootReducer = {
  session: sessionReducer,
  user: userReducer,
  resume: resumeReducer,
};

export default rootReducer;
