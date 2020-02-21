import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Profile from './Profile';
import { Auth0Context } from '../../../util/auth0/context';

describe('client/Components/Pages/Private/Profile', () => {
  const getProfile = (auth) => (
    <Auth0Context.Provider value={auth}>
      <Router>
        <Profile />
      </Router>
    </Auth0Context.Provider>
  );
  it('should render profile', async () => {
    // Arrange
    const user = {
      nickname: 'Nickname',
      picture: 'Picture',
      arg: 'Loaded Arg',
    };

    const auth = {
      loading: false,
      user,
    };

    // Act
    const { getByText, getByAltText } = render(getProfile(auth));

    // Assert
    await waitForElement(() => getByAltText('Profile'));
    getByText(/Nickname/);
    getByText(/Picture/);
    getByText(/Loaded Arg/);
  });
  it('should render Loading', async () => {
    // Arrange
    const auth = {
      loading: true,
    };

    // Act
    const { getByAltText } = render(getProfile(auth));

    // Assert
    getByAltText(/Loading/);
  });
});
