import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import { StateType } from '../../../types/state.types';
import Profile from './index';
import configureStore from '../../store/configure-store';

describe('client/components/resume/profile', () => {
  const getProfile = (store) => (
    <Provider store={store}>
      <Router>
        <Profile />
      </Router>
    </Provider>
  );
  it('should render profile', async () => {
    // Arrange
    const state: StateType = {
      session: {
        isLoading: false,
        expiration: 1,
        darkMode: 'dark-mode',
        authenticated: true,
      },
      user: {
        nickname: 'Nickname',
        picture: 'Picture',
        email: 'User Email',
      },
      resume: {
        email: 'Resume Email',
      },
    };
    const store = configureStore(state);

    // Act
    const { getByText, getByAltText } = render(getProfile(store));

    // Assert
    await waitFor(() => getByAltText('Profile'));
    getByText(/Nickname/);
    getByText(/Picture/);
    getByText(/email/);
  });
  it('should render loading', async () => {
    // Arrange
    const state: StateType = {
      session: {
        expiration: 1,
        darkMode: 'dark-mode',
        authenticated: true,
        isLoading: false,
      },
      user: {},
      resume: {
        email: 'email',
      },
    };
    const store = configureStore(state);

    // Act
    const { getByAltText } = render(getProfile(store));

    // Assert
    getByAltText(/Loading/);
  });
});
