import updateAuthentication from './session.action';
import SESSION from './constants';

describe('client/store/session/update-authentication.action', () => {
  it('should create an action to update authentication', () => {
    // Arrange
    const expectedAuthentication = true;
    const expectedExpiration = -1;
    const expectedAction = {
      type: SESSION.UPDATE_AUTHENTICATION,
      meta: {
        authenticated: expectedAuthentication,
        expiration: expectedExpiration,
      },
    };

    // Act
    const action = updateAuthentication(expectedAuthentication, expectedExpiration);

    // Assert
    expect(action).toEqual(expectedAction);
  });
});
