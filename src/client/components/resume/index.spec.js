import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Resume from './index';
import { Auth0Context } from '../../../util/auth0/auth0-context';

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: {} }),
}));

describe('client/components/Pages/Private/resume', () => {
  const resume = {
    resume: [
      { id: 1, title: 'resume #1' },
      { id: 2, title: 'resume #2' },
    ],
  };
  const defaultAuth = {
    getToken: jest.fn(() => 'token'),
  };
  const getResume = (auth) => (
    <Auth0Context.Provider value={auth}>
      <Router>
        <Resume />
      </Router>
    </Auth0Context.Provider>
  );

  afterEach(() => {
  });

  it('should render request', async () => {
    // Arrange
    axios.get
      .mockResolvedValueOnce({
        data: resume,
      });

    // Act
    const { getByText } = render(getResume(defaultAuth));

    // Assert
    await waitForElement(() => getByText(/Resume Header/));
    getByText(/Resume Summary/);
    getByText(/Resume Skills/);
    getByText(/Resume Experience/);
    getByText(/Resume Education/);
  });
  it('should render default request if there is no token', async () => {
    // Arrange
    const overrideAuth = {
      getToken: jest.fn(),
    };

    // Act
    const { getByText } = render(getResume(overrideAuth));

    // Assert
    await waitForElement(() => getByText(/Resume Header/));
    getByText(/Resume Summary/);
    getByText(/Resume Skills/);
    getByText(/Resume Experience/);
    getByText(/Resume Education/);
    getByText(/Not authorized to view this page/);
  });
  it('should throw exception with bad response', async () => {
    // Arrange
    axios.get
      .mockRejectedValue(new Error('Request failed with status code 500'));

    // Act
    const { getByText } = render(getResume(defaultAuth));

    // Assert
    await waitForElement(() => getByText(/Request failed with status code 500/));
    getByText(/Resume Summary/);
  });
});
