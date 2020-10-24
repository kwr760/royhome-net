import createStore from './create-store';
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
        email: 'kroy760@gmail.com',
      },
    };

    // Act
    const store = createStore();

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
        isLoading: false,
        darkMode: DarkModes.CLEAR_MODE,
      },
      user: {},
      resume: {
        email: 'kroy760@gmail.com',
      },
    };

    // Act
    const store = createStore(state);

    // Assert
    expect(store.dispatch).toEqual(expect.any(Function));
    expect(store.getState()).toEqual(state);
  });
});
