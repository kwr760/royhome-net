import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import { render, waitForElement } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import Private from './Private';
import AuthContext from '../../Auth/AuthContext';

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: {} }),
}));

describe('client/components/Pages/Private/Private', () => {
  const message = 'test-message';
  const auth = {
    getAccessToken: jest.fn(),
  };

  it('should render request', async () => {
    // Arrange
    axios.get.mockResolvedValueOnce({
      data: { message },
    });

    // Arrange
    const { getByText } = render(
      <Router>
        <AuthContext.Provider value={auth}>
          <Private />
        </AuthContext.Provider>
      </Router>,
    );

    await waitForElement(() => getByText(message));
    expect(auth.getAccessToken).toBeCalled();
  });
  it('should throw exception with bad response', () => {
    // Arrange
    axios.get.mockRejectedValueOnce(new Error('Request failed with status code 500'));

    // Arrange
    const { getByText } = render(
      <Router>
        <AuthContext.Provider value={auth}>
          <Private />
        </AuthContext.Provider>
      </Router>,
    );

    // Assert
    waitForElement(() => getByText(/Request failed with status code 500/));
  });
});
