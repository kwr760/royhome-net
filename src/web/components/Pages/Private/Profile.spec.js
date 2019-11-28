import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Profile from './Profile';
import AuthContext from '../../Auth/AuthContext';

describe('web/components/Pages/Private/Profile', () => {
  it('should render request', async () => {
    // Arrange
    const error = undefined;
    const profile = {
      nickname: 'Nickname',
      picture: 'picture',
      arg: 'Loaded Arg',
    };

    const auth = {
      getAccessToken: jest.fn(),
      getProfile: jest.fn((cb) => cb(profile, error)),
    };

    // Arrange
    const { getByText } = render(
      <Router>
        <AuthContext.Provider value={auth}>
          <Profile />
        </AuthContext.Provider>
      </Router>,
    );

    await waitForElement(() => getByText('Profile'));
    getByText('Nickname');
    getByText(/picture/);
    getByText(/Loaded Arg/);
  });
  it('should render error', async () => {
    // Arrange
    const error = 'This is an error message';
    const profile = {};

    const auth = {
      getAccessToken: jest.fn(),
      getProfile: jest.fn((cb) => cb(profile, error)),
    };

    // Arrange
    const { getByText } = render(
      <Router>
        <AuthContext.Provider value={auth}>
          <Profile />
        </AuthContext.Provider>
      </Router>,
    );

    await waitForElement(() => getByText('This is an error message'));
  });
});
