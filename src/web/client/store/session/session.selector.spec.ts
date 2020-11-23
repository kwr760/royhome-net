import { useSelector } from 'react-redux';

import { isAuthenticated, isLoading, getDarkMode } from './session.selector';
import { DarkModes } from './session.constants';

jest.mock('react-redux');

describe('client/store/session/session.selector', () => {
  it('should return session information', () => {
    // Arrange
    const expectedAuthentication = true;
    const expectedLoading = true;
    const expectedDarkMode = DarkModes.DARK_MODE;
    const mockState = {
      session: {
        authenticated: expectedAuthentication,
        isLoading: expectedLoading,
        darkMode: expectedDarkMode,
      },
    };
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const authenticated = useSelector(isAuthenticated);
    const loading = useSelector(isLoading);
    const darkMode = useSelector(getDarkMode);

    // Assert
    expect(authenticated).toEqual(expectedAuthentication);
    expect(loading).toEqual(expectedLoading);
    expect(darkMode).toEqual(expectedDarkMode);
  });
  it('should return session default', () => {
    // Arrange
    const expectedAuthentication = false;
    const expectedLoading = false;
    const expectedDarkMode = DarkModes.CLEAR_MODE;
    const mockState = {
      session: {},
    };
    (useSelector as jest.Mock).mockImplementation((callback) => callback(mockState));

    // Act
    const authenticated = useSelector(isAuthenticated);
    const loading = useSelector(isLoading);
    const darkMode = useSelector(getDarkMode);

    // Assert
    expect(authenticated).toEqual(expectedAuthentication);
    expect(loading).toEqual(expectedLoading);
    expect(darkMode).toEqual(expectedDarkMode);
  });
});
