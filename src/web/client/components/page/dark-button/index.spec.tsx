import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { StateType } from '../../../../types/store.types';

import DarkButton from './index';
import { DarkModes } from '../../../store/session/session.constants';
import configureStore from '../../../store/configure-store';
import { updateDarkMode } from '../../../store/session/session.action';

jest.mock('react-icons/fi');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));
jest.mock('../../../store/session/session.action');

describe('src/client/components/page/dark-mode', () => {
  const getComponent = (store) => (
    <Provider store={store}>
      <DarkButton />
    </Provider>
  );
  it('renders in light mode', () => {
    // Arrange
    const state: StateType = {
      session: {
        darkMode: DarkModes.LIGHT_MODE,
      },
    };
    const store = configureStore(state);
    (FiSun as jest.Mock).mockImplementation(() => 'FiSun');
    const mockUpdateDarkMode = jest.fn();
    (updateDarkMode as jest.Mock).mockImplementation(mockUpdateDarkMode);

    // Act
    const { getByText, getByRole } = render(getComponent(store));
    fireEvent.click(getByRole('button'));

    // Assert
    getByText(/FiSun/);
    expect(mockUpdateDarkMode).toBeCalledWith(DarkModes.DARK_MODE);
  });
  it('renders in dark mode', () => {
    // Arrange
    const state: StateType = {
      session: {
        darkMode: DarkModes.DARK_MODE,
      },
    };
    const store = configureStore(state);
    (FiMoon as jest.Mock).mockImplementation(() => 'FiMoon');
    const mockUpdateDarkMode = jest.fn();
    (updateDarkMode as jest.Mock).mockImplementation(mockUpdateDarkMode);

    // Act
    const { getByText, getByRole } = render(getComponent(store));
    fireEvent.click(getByRole('button'));

    // Assert
    getByText(/FiMoon/);
    expect(mockUpdateDarkMode).toBeCalledWith(DarkModes.LIGHT_MODE);
  });
});
