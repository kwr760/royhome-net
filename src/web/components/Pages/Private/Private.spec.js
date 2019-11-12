import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Private from './Private';

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
    const { getByText } = render(<Private auth={auth} />);

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
    const { getByText } = render(<Private auth={auth} />);

    // Assert
    waitForElement(() => getByText(/Network response was not good/));
  });
});
