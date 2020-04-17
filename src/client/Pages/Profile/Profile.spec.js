import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import Profile from './Profile';
import { Auth0Context } from '../../../util/auth0/context';
import configureStore from '../../store/configure-store';

describe('client/Components/Pages/Private/Profile', () => {
  const getProfile = (store, auth) => (
    <Provider store={store}>
      <Auth0Context.Provider value={auth}>
        <Router>
          <Profile />
        </Router>
      </Auth0Context.Provider>
    </Provider>
  );
  it('should render profile', async () => {
    // Arrange
    const user = {
      nickname: 'Nickname',
      picture: 'Picture',
      arg: 'Loaded Arg',
    };
    const auth = {
      user,
    };
    const state = {
      session: {
        isLoading: false,
      },
    };
    const store = configureStore(state);

    // Act
    const { getByText, getByAltText } = render(getProfile(store, auth));

    // Assert
    await waitForElement(() => getByAltText('Profile'));
    getByText(/Nickname/);
    getByText(/Picture/);
    getByText(/Loaded Arg/);
  });
  it('should render Loading', async () => {
    // Arrange
    const auth = {
    };
    const state = {
      session: {
        isLoading: false,
      },
    };
    const store = configureStore(state);

    // Act
    const { getByAltText } = render(getProfile(store, auth));

    // Assert
    getByAltText(/Loading/);
  });
});
