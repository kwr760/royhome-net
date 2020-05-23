import configureStore from './configure-store';

describe('client/store/configure', () => {
  it('should configure the store without initialState', () => {
    // Arrange
    const expectedState = {
      session: {
        authenticated: false,
        expiration: 0,
        isLoading: false,
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
