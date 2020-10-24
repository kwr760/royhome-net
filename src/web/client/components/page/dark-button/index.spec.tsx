import React from 'react';
import { useDispatch, Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import { FiSun, FiMoon } from 'react-icons/fi';

import DarkButton from './index';
import { DarkModes } from '../../../store/session/session.constants';
import createStore from '../../../store/create-store';

jest.mock('react-icons/fi');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('src/client/components/page/dark-mode', () => {
  const expectLightMode = { payload: DarkModes.LIGHT_MODE, type: 'session/updateDarkMode' };
  const expectDarkMode = { payload: DarkModes.DARK_MODE, type: 'session/updateDarkMode' };
  const getComponent = (store) => (
    <Provider store={store}>
      <DarkButton />
    </Provider>
  );
  it('renders in light mode', () => {
    // Arrange
    const state = {
      session: {
        darkMode: DarkModes.LIGHT_MODE,
      },
    };
    const store = createStore(state);
    (FiSun as jest.Mock).mockImplementation(() => 'FiSun');
    const dispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatch);

    // Act
    const { getByText, getByRole } = render(getComponent(store));
    fireEvent.click(getByRole('button'));

    // Assert
    getByText(/FiSun/);
    expect(dispatch).toHaveBeenNthCalledWith(1, expectDarkMode);
  });
  it('renders in dark mode', () => {
    // Arrange
    const state = {
      session: {
        darkMode: DarkModes.DARK_MODE,
      },
    };
    const store = createStore(state);
    (FiMoon as jest.Mock).mockImplementation(() => 'FiMoon');
    const dispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatch);

    // Act
    const { getByText, getByRole } = render(getComponent(store));
    fireEvent.click(getByRole('button'));

    // Assert
    getByText(/FiMoon/);
    expect(dispatch).toHaveBeenNthCalledWith(1, expectLightMode);
  });
});
