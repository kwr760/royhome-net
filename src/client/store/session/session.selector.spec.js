import { useSelector } from 'react-redux';

import { isAuthenticated, isLoading } from './session.selector';

// jest.mock('react-redux', () => ({
//   useSelector: jest.fn(),
// }));
jest.mock('react-redux');

describe('client/store/session/session.selector', () => {
  it('should return authenicated', () => {
    // Arrange
    const expectedAuthentication = true;
    const mockState = {
      session: {
        authenticated: expectedAuthentication,
      },
    };
    useSelector.mockImplementation((callback) => callback(mockState));

    // Act
    const authenticated = useSelector((state) => isAuthenticated(state, null));

    // Assert
    expect(authenticated).toEqual(expectedAuthentication);
  });
  it('should return isLoading', () => {
    // Arrange
    const expectedLoading = true;
    const mockState = {
      session: {
        isLoading: expectedLoading,
      },
    };
    useSelector.mockImplementation((callback) => callback(mockState));

    // Act
    const loading = useSelector((state) => isLoading(state, null));

    // Assert
    expect(loading).toEqual(expectedLoading);
  });
});
