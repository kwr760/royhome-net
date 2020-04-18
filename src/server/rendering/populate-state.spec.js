import populateState from './populate-state';

describe('server/rendering/populate-state', () => {
  it('should return an state from empty context', () => {
    // Arrange
    const context = {
    };
    const expected = {
      session: {
        authenticated: false,
        expiration: -1,
        isLoading: false,
      },
      user: {},
    };

    // Act
    const state = populateState(context);

    // Assert
    expect(state).toEqual(expected);
  });
});
