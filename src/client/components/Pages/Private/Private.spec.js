import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import { render, waitForElement } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import Private from './Private';
import { Auth0Context } from '../../../../util/auth0/context';

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: {} }),
}));

describe('client/components/Pages/Private/Private', () => {
  const message = 'test-message';
  const auth = {
    getTokenSilently: jest.fn(),
  };

  it('should render request', async () => {
    // Arrange
    axios.get.mockResolvedValueOnce({
      data: { message },
    });

    // Arrange
    const { getByText } = render(
      <Auth0Context.Provider value={auth}>
        <Router>
          <Private />
        </Router>
      </Auth0Context.Provider>,
    );

    await waitForElement(() => getByText(message));
    expect(auth.getTokenSilently).toBeCalled();
  });
  it('should throw exception with bad response', () => {
    // Arrange
    axios.get.mockRejectedValueOnce(new Error('Request failed with status code 500'));

    // Arrange
    const { getByText } = render(
      <Auth0Context.Provider value={auth}>
        <Router>
          <Private />
        </Router>
      </Auth0Context.Provider>,
    );

    // Assert
    waitForElement(() => getByText(/Request failed with status code 500/));
  });
  it('should throw exception with unknown exception', () => {
    // Arrange
    axios.get.mockRejectedValueOnce(new Error());

    // Arrange
    const { getByText } = render(
      <Auth0Context.Provider value={auth}>
        <Router>
          <Private />
        </Router>
      </Auth0Context.Provider>,
    );

    // Assert
    waitForElement(() => getByText(/An unknown error included/));
  });
});
