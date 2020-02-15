import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Profile from './Profile';
import { Auth0Context } from '../../../util/auth0/context';

describe('client/Components/Pages/Private/Profile', () => {
  it('should render profile', async () => {
    // Arrange
    const user = {
      nickname: 'Nickname',
      picture: 'picture',
      arg: 'Loaded Arg',
    };

    const auth = {
      loading: false,
      user,
    };

    // Arrange
    const { getByText, getByAltText } = render(
      <Auth0Context.Provider value={auth}>
        <Router>
          <Profile />
        </Router>
      </Auth0Context.Provider>,
    );

    await waitForElement(() => getByAltText('Profile'));
    getByText(/Nickname/);
    getByText(/picture/);
    getByText(/Loaded Arg/);
  });
  it('should render Loading', async () => {
    // Arrange
    const auth = {
      loading: true,
    };

    // Arrange
    const { getByAltText } = render(
      <Auth0Context.Provider value={auth}>
        <Router>
          <Profile />
        </Router>
      </Auth0Context.Provider>,
    );

    getByAltText(/Loading/);
  });
});
