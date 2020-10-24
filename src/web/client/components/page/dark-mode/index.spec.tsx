import React from 'react';
import { useDispatch, Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import { FiSun, FiMoon } from 'react-icons/fi';

import DarkMode from './index';
import { DarkModes } from '../../../store/session/session.constants';
import createStore from '../../../store/create-store';

jest.mock('react-icons/fi');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('src/client/components/page/dark-mode', () => {
  const expectLightMode = { payload: DarkModes.LIGHT_MODE, type: 'session/updateDarkMode' };
  const expectClearMode = { payload: DarkModes.CLEAR_MODE, type: 'session/updateDarkMode' };
  const expectDarkMode = { payload: DarkModes.DARK_MODE, type: 'session/updateDarkMode' };
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
    const store = createStore(state);
    const dispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
    (FiSun as jest.Mock).mockImplementation(() => 'FiSun');
    (FiMoon as jest.Mock).mockImplementation(() => 'FiMoon');

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
    expect(dispatch).toHaveBeenNthCalledWith(1, expectLightMode);
    expect(dispatch).toHaveBeenNthCalledWith(2, expectClearMode);
    expect(dispatch).toHaveBeenNthCalledWith(3, expectDarkMode);
  });
});
