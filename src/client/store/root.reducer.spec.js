import rootReducer from './root.reducer';
import { sessionReducer } from './session/session.reducer';
import { userReducer } from './user/user.reducer';
import { resumeReducer } from './resume/resume.reducer';

describe('client/store/reducers/root', () => {
  it('should call rootReducer', () => {
    // Arrange
    // Act
    const reducerCount = Object.keys(rootReducer).length;

    // Assert
    expect(rootReducer).toEqual({
      session: sessionReducer,
      user: userReducer,
      resume: resumeReducer,
    });
    expect(reducerCount).toBe(3);
  });
});
