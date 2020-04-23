import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Resume from './Resume';
import { Auth0Context } from '../../../util/auth0/context';

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: {} }),
}));

describe('client/Components/Pages/Private/Resume', () => {
  const resume = {
    resume: [
      { id: 1, title: 'Resume #1' },
      { id: 2, title: 'Resume #2' },
    ],
  };
  const auth = {
    getToken: jest.fn(),
  };
  const emptyContext = {};
  const getResume = (context) => (
    <Auth0Context.Provider value={auth}>
      <Router>
        <Resume context={context} />
      </Router>
    </Auth0Context.Provider>
  );

  it('should render request', async () => {
    // Arrange
    axios.get
      .mockResolvedValueOnce({
        data: resume,
      });

    // Act
    const { getByText } = render(getResume());

    // Assert
    await waitForElement(() => getByText(/Resume #1/));
    getByText(/Resume #2/);
  });
  it('should throw exception with bad response', async () => {
    // Arrange
    axios.get
      .mockRejectedValue(new Error('Request failed with status code 500'));

    // Act
    const { getByText } = render(getResume(emptyContext));

    // Assert
    await waitForElement(() => getByText(/Request failed with status code 500/));
  });
});
