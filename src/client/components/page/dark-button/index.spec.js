import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DarkButton from './index';
import { DarkModes } from '../../../store/session/session.constants';
import configureStore from '../../../store/configure-store';
import { updateDarkMode } from '../../../store/session/session.action';

jest.mock('@fortawesome/react-fontawesome');
jest.mock('../../../store/session/session.action');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

describe('src/client/components/page/dark-mode', () => {
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
    const store = configureStore(state);
    FontAwesomeIcon.mockImplementation(({ icon }) => `Icon: ${icon}`);
    const mockUpdateDarkMode = jest.fn();
    updateDarkMode.mockImplementation(mockUpdateDarkMode);

    // Act
    const { getByText, getByRole } = render(getComponent(store));
    fireEvent.click(getByRole('button'));

    // Assert
    getByText(/Icon: far,lightbulb/);
    expect(mockUpdateDarkMode).toBeCalledWith(DarkModes.DARK_MODE);
  });
  it('renders in dark mode', () => {
    // Arrange
    const state = {
      session: {
        darkMode: DarkModes.DARK_MODE,
      },
    };
    const store = configureStore(state);
    FontAwesomeIcon.mockImplementation(({ icon }) => `Icon: ${icon}`);
    const mockUpdateDarkMode = jest.fn();
    updateDarkMode.mockImplementation(mockUpdateDarkMode);

    // Act
    const { getByText, getByRole } = render(getComponent(store));
    fireEvent.click(getByRole('button'));

    // Assert
    getByText(/Icon: fas,lightbulb/);
    expect(mockUpdateDarkMode).toBeCalledWith(DarkModes.LIGHT_MODE);
  });
});
