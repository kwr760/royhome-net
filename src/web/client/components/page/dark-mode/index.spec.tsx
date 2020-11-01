import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { Store } from 'redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import DarkMode from './index';
import { DarkModes } from '../../../store/session/session.constants';

jest.mock('react-icons/fi');

describe('src/client/components/page/dark-mode', () => {
  const mockStore = configureMockStore([thunk]);
  const actionType = 'session/updateDarkMode';
  const getComponent = (store: Store) => (
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
    const store = mockStore(state);
    (FiSun as jest.Mock).mockImplementation(() => 'FiSun');
    (FiMoon as jest.Mock).mockImplementation(() => 'FiMoon');

    // Act
    const { getByText, getByRole, getAllByRole } = render(getComponent(store));
    const actions = store.getActions();
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
    expect(actions.length).toEqual(3);
    expect(actions[0].type).toEqual(actionType);
    expect(actions[0].payload).toEqual(DarkModes.LIGHT_MODE);
    expect(actions[1].type).toEqual(actionType);
    expect(actions[1].payload).toEqual(DarkModes.CLEAR_MODE);
    expect(actions[2].type).toEqual(actionType);
    expect(actions[2].payload).toEqual(DarkModes.DARK_MODE);
  });
});
