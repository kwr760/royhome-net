import configureStore from './configure-store';
import { DarkModes } from './session/session.constants';

describe('client/store/configure', () => {
  it('should configure the store without initialState', () => {
    // Arrange
    const expectedState = {
      session: {
        authenticated: false,
        expiration: 0,
        isLoading: false,
        darkMode: DarkModes.CLEAR_MODE,
      },
      user: {},
      resume: {
        activeResume: 'kroy760@gmail.com',
      },
    };

    // Act
    const store = configureStore();

    // Assert
    expect(store.dispatch).toEqual(expect.any(Function));
    expect(store.getState()).toEqual(expectedState);
  });
  it('should configure the store', () => {
    // Arrange
    const state = {
      session: {
        authenticated: true,
        expiration: -1,
      },
      user: {},
      resume: {},
    };

    // Act
    const store = configureStore(state);

    // Assert
    expect(store.dispatch).toEqual(expect.any(Function));
    expect(store.getState()).toEqual(state);
  });
});
