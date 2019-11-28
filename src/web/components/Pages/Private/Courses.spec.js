import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Courses from './Courses';
import Logger from '../../../logger';
import AuthContext from '../../Auth/AuthContext';

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: {} }),
}));

describe('web/components/Pages/Private/Courses', () => {
  const courses = {
    courses: [
      { id: 1, title: 'Course #1' },
      { id: 2, title: 'Course #2' },
    ],
  };
  const adminMessage = {
    message: 'Hello to an admin!',
  };
  const auth = {
    getAccessToken: jest.fn(),
  };

  beforeEach(() => {
    Logger.log = jest.fn();
    Logger.error = jest.fn();
  });
  afterEach(() => {
    Logger.log.mockRestore();
    Logger.error.mockRestore();
  });

  it('should render request', async () => {
    // Arrange
    axios.get
      .mockResolvedValueOnce({
        data: courses,
      })
      .mockResolvedValueOnce({
        data: adminMessage,
      });

    // Arrange
    const { getByText } = render(
      <Router>
        <AuthContext.Provider value={auth}>
          <Courses />
        </AuthContext.Provider>
      </Router>,
    );

    await waitForElement(() => getByText(/Course #1/));
    getByText(/Course #2/);
    expect(Logger.log).toBeCalledWith(adminMessage);
  });
  it('should throw exception with bad response', async () => {
    // Arrange
    axios.get
      .mockRejectedValue(new Error('Request failed with status code 500'));

    // Arrange
    const { getByText } = render(
      <Router>
        <AuthContext.Provider value={auth}>
          <Courses />
        </AuthContext.Provider>
      </Router>,
    );

    // Assert
    await waitForElement(() => getByText(/Request failed with status code 500/));
  });
});
