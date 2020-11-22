import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import { Store } from 'redux';
import { StateType } from '../../../types/state.types';
import themeLight from '../../theme-light';
import Profile from './index';
import createStore from '../../store/create-store';

describe('client/components/resume/profile', () => {
  const getProfile = (store: Store) => (
    <Provider store={store}>
      <ThemeProvider theme={themeLight}>
        <Router>
          <Profile />
        </Router>
      </ThemeProvider>
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
        resumes: {},
      },
    };
    const store = createStore(state);

    // Act
    const { getByText, getByAltText } = render(getProfile(store));

    // Assert
    await waitFor(() => getByAltText('Profile'));
    getByText(/Nickname/);
    getByText(/Picture/);
    getByText(/email/);
  });
});
