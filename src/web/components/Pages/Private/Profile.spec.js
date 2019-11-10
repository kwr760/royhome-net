import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Profile from './Profile';

describe('web/components/Pages/Private/Profile', () => {
  it('should render fetched message', async () => {
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
    const { getByText } = render(<Profile auth={auth} />);

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
    const { getByText } = render(<Profile auth={auth} />);

    await waitForElement(() => getByText('This is an error message'));
  });
});
