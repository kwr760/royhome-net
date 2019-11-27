import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Private from './Private';
import AuthContext from '../../Auth/AuthContext';

describe('web/components/Pages/Private/Private', () => {
  const message = 'test-message';
  const auth = {
    getAccessToken: jest.fn(),
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });
  afterEach(() => {
    global.fetch.mockRestore();
  });

  it('should render fetched message', async () => {
    // Arrange
    global.fetch.mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message }),
    }));

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
    global.fetch.mockImplementation(() => Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message }),
    }));

    // Arrange
    const { getByText } = render(
      <Router>
        <AuthContext.Provider value={auth}>
          <Private />
        </AuthContext.Provider>
      </Router>,
    );

    // Assert
    waitForElement(() => getByText(/Network response was not good/));
  });
});
