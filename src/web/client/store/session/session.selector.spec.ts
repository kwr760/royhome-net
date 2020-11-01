import { useSelector } from 'react-redux';

import { isAuthenticated, isLoading, getDarkMode } from './session.selector';
import { DarkModes } from './session.constants';

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
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const authenticated = useSelector(isAuthenticated);

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
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const loading = useSelector(isLoading);

    // Assert
    expect(loading).toEqual(expectedLoading);
  });
  it('should return darkMode', () => {
    // Arrange
    const expectedDarkMode = DarkModes.DARK_MODE;
    const mockState = {
      session: {
        darkMode: expectedDarkMode,
      },
    };
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const darkMode = useSelector(getDarkMode);

    // Assert
    expect(darkMode).toEqual(expectedDarkMode);
  });
});
