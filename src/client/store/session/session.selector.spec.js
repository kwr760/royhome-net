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
    useSelector.mockImplementation((callback) => callback(mockState));

    // Act
    const authenticated = useSelector((state) => isAuthenticated(state));

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
    const loading = useSelector((state) => isLoading(state));

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
    useSelector.mockImplementation((callback) => callback(mockState));

    // Act
    const darkMode = useSelector((state) => getDarkMode(state));

    // Assert
    expect(darkMode).toEqual(expectedDarkMode);
  });
});
