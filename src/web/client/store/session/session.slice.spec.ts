import { SessionStateType } from '../../../types/state.types';
import { DarkModes } from './session.constants';
import sessionReducer, {
  updateAuthentication,
  updateDarkMode,
  updateLoading,
  setLoading,
  clearLoading,
} from './session.slice';

describe('client/store/session/session.slice', () => {
  const initialState: SessionStateType = {
    authenticated: false,
    expiration: 0,
    isLoading: false,
    darkMode: DarkModes.CLEAR_MODE,
  } as SessionStateType;

  it('should call updateAuthenication', () => {
    // Arrange
    const action = {
      authenticated: true,
      expiration: 1000,
    };
    const expected = {
      authenticated: true,
      expiration: 1000,
      isLoading: false,
      darkMode: DarkModes.CLEAR_MODE,
    };

    // Act
    const result = sessionReducer(initialState, updateAuthentication(action));

    // Assert
    expect(result).toEqual(expected);
  });
  it('should call setLoading', () => {
    // Arrange
    const expected = {
      authenticated: false,
      expiration: 0,
      isLoading: true,
      darkMode: DarkModes.CLEAR_MODE,
    };

    // Act
    const result = sessionReducer(initialState, setLoading());

    // Assert
    expect(result).toEqual(expected);
  });
  it('should call updateDarkMode', () => {
    // Arrange
    const action = DarkModes.DARK_MODE;
    const expected = {
      authenticated: false,
      expiration: 0,
      isLoading: false,
      darkMode: DarkModes.DARK_MODE,
    };

    // Act
    const result = sessionReducer(initialState, updateDarkMode(action));

    // Assert
    expect(result).toEqual(expected);
  });
  it('should call setLoading', () => {
    // Arrange
    const expected = {
      authenticated: false,
      expiration: 0,
      isLoading: true,
      darkMode: DarkModes.CLEAR_MODE,
    };

    // Act
    const result = sessionReducer(initialState, setLoading());

    // Assert
    expect(result).toEqual(expected);
  });
  it('should call clearLoading', () => {
    // Arrange
    const expected = {
      authenticated: false,
      expiration: 0,
      isLoading: false,
      darkMode: DarkModes.CLEAR_MODE,
    };

    // Act
    const result = sessionReducer(initialState, clearLoading());

    // Assert
    expect(result).toEqual(expected);
  });
  it('should call updateLoading', () => {
    // Arrange
    const expected = {
      authenticated: false,
      expiration: 0,
      isLoading: true,
      darkMode: DarkModes.CLEAR_MODE,
    };

    // Act
    const result = sessionReducer(initialState, updateLoading(true));

    // Assert
    expect(result).toEqual(expected);
  });
});
