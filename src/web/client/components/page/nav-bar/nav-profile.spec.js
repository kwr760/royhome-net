import React from 'react';
import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import NavProfile from './nav-profile';
import configureStore from '../../../store/configure-store';

jest.mock('./nav-profile-dropdown', () => () => (<div>Nav Profile Dropdown</div>));
jest.mock('./nav-login', () => () => (<div>Nav Login</div>));

describe('client/components/page/nav-bar/nav-profile', () => {
  const getComponent = (store) => (
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
    const store = configureStore(state);

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
    const store = configureStore(state);

    // Act
    const { getByText } = render(getComponent(store));

    // Assert
    getByText(/Nav Login/);
  });
});
