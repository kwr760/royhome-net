import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import Profile from './profile';
import configureStore from '../../store/configure-store';

describe('client/Components/Pages/Private/Profile', () => {
  const getProfile = (store) => (
    <Provider store={store}>
      <Router>
        <Profile />
      </Router>
    </Provider>
  );
  it('should render profile', async () => {
    // Arrange
    const state = {
      session: {
        isLoading: false,
      },
      user: {
        nickname: 'Nickname',
        picture: 'Picture',
        arg: 'Loaded Arg',
      },
    };
    const store = configureStore(state);

    // Act
    const { getByText, getByAltText } = render(getProfile(store));

    // Assert
    await waitForElement(() => getByAltText('Profile'));
    getByText(/Nickname/);
    getByText(/Picture/);
    getByText(/Loaded Arg/);
  });
  it('should render Loading', async () => {
    // Arrange
    const state = {
      session: {
        isLoading: false,
      },
    };
    const store = configureStore(state);

    // Act
    const { getByAltText } = render(getProfile(store));

    // Assert
    getByAltText(/Loading/);
  });
});
