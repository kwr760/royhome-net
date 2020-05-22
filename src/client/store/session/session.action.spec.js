import { updateAuthentication, updateLoading } from './session.action';
import { SESSION_ACTION } from './session.constants';

describe('client/store/session/session.action', () => {
  it('should create an action to update authentication', () => {
    // Arrange
    const expectedAuthentication = true;
    const expectedExpiration = -1;
    const expectedAction = {
      type: SESSION_ACTION.UPDATE_AUTHENTICATION,
      payload: {
        authenticated: expectedAuthentication,
        expiration: expectedExpiration,
      },
    };

    // Act
    const action = updateAuthentication(expectedAuthentication, expectedExpiration);

    // Assert
    expect(action).toEqual(expectedAction);
  });
  it('should create an action to update loading', () => {
    // Arrange
    const expectedLoading = true;
    const expectedAction = {
      type: SESSION_ACTION.UPDATE_LOADING,
      payload: {
        isLoading: expectedLoading,
      },
    };

    // Act
    const action = updateLoading(expectedLoading);

    // Assert
    expect(action).toEqual(expectedAction);
  });
});
