import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import { FiSun, FiMoon } from 'react-icons/fi';

import DarkMode from './index';
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
      <DarkMode />
    </Provider>
  );
  it('renders', () => {
    // Arrange
    const state = {
      session: {
        darkMode: DarkModes.DARK_MODE,
      },
    };
    const store = configureStore(state);
    FiSun.mockImplementation(({ icon }) => 'FiSun');
    FiMoon.mockImplementation(({ icon }) => 'FiMoon');
    const mockUpdateDarkMode = jest.fn();
    updateDarkMode.mockImplementation(mockUpdateDarkMode);

    // Act
    const { getByText, getByRole, getAllByRole } = render(getComponent(store));
    const buttons = getAllByRole('button');
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    fireEvent.click(buttons[2]);

    // Assert
    getByText(/FiSun/);
    getByText(/FiMoon/);
    const group = getByRole('group');
    expect(group.children.length).toBe(3);
    expect(buttons.length).toBe(3);
    expect(mockUpdateDarkMode).toBeCalledWith(DarkModes.LIGHT_MODE);
    expect(mockUpdateDarkMode).toBeCalledWith(DarkModes.CLEAR_MODE);
    expect(mockUpdateDarkMode).toBeCalledWith(DarkModes.DARK_MODE);
  });
});
