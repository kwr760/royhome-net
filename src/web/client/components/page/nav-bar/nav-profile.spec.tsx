import React from 'react';
import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import { Store } from 'redux';
import NavLogin from './nav-login';
import NavProfile from './nav-profile';
import createStore from '../../../store/create-store';
import NavProfileDropDown from './nav-profile-dropdown';

jest.mock('./nav-profile-dropdown');
jest.mock('./nav-login');

describe('client/components/page/nav-bar/nav-profile', () => {
  const getComponent = (store: Store) => (
    <Provider store={store}>
      <NavProfile />
    </Provider>
  );
  it('should render the authenticated profile', () => {
    // Arrange
    const state = {
      session: {
        authenticated: true,
      },
    };
    const store = createStore(state);
    (NavProfileDropDown as jest.Mock).mockImplementation(() => <div>Nav Profile Dropdown</div>);

    // Act
    const { getByText } = render(getComponent(store));

    // Assert
    getByText(/Nav Profile Dropdown/);
  });
  it('should render login if unauthenticated', () => {
    // Arrange
    const state = {
      session: {
        authenticated: false,
      },
    };
    const store = createStore(state);
    (NavLogin as jest.Mock).mockImplementation(() => <div>Nav Login</div>);

    // Act
    const { getByText } = render(getComponent(store));

    // Assert
    getByText(/Nav Login/);
  });
});
