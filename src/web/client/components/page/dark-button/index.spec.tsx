import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { Store } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import DarkButton from './index';
import { DarkModes } from '../../../store/session/session.constants';

jest.mock('react-icons/fi');

describe('src/client/components/page/dark-mode', () => {
  const mockStore = configureMockStore([thunk]);
  const actionType = 'session/updateDarkMode';
  const getComponent = (store: Store) => (
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
    const store = mockStore(state);
    (FiSun as jest.Mock).mockImplementation(() => 'FiSun');

    // Act
    const { getByText, getByRole } = render(getComponent(store));
    const actions = store.getActions();
    fireEvent.click(getByRole('button'));

    // Assert
    getByText(/FiSun/);
    expect(actions.length).toEqual(1);
    expect(actions[0].type).toEqual(actionType);
    expect(actions[0].payload).toEqual(DarkModes.DARK_MODE);
  });
  it('renders in dark mode', () => {
    // Arrange
    const state = {
      session: {
        darkMode: DarkModes.DARK_MODE,
      },
    };
    // const store = createStore(state);
    const store = mockStore(state);
    (FiMoon as jest.Mock).mockImplementation(() => 'FiMoon');

    // Act
    const { getByText, getByRole } = render(getComponent(store));
    const actions = store.getActions();
    fireEvent.click(getByRole('button'));

    // Assert
    getByText(/FiMoon/);
    expect(actions.length).toEqual(1);
    expect(actions[0].type).toEqual(actionType);
    expect(actions[0].payload).toEqual(DarkModes.LIGHT_MODE);
  });
});
