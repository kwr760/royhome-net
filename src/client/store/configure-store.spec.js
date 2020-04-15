import configureStore from './configure-store';

describe('client/store/configure', () => {
  it('should configure the store without initialState', () => {
    // Arrange
    const expectedState = {
      session: {
        authenticated: false,
        expiration: 0,
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
    };

    // Act
    const store = configureStore(state);

    // Assert
    expect(store.dispatch).toEqual(expect.any(Function));
    expect(store.getState()).toEqual(state);
  });
});
