import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Courses from './Courses';
import Logger from '../../../logger';
import AuthContext from '../../Auth/AuthContext';

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
    global.fetch = jest.fn();
    Logger.log = jest.fn();
    Logger.error = jest.fn();
  });
  afterEach(() => {
    global.fetch.mockRestore();
    Logger.log.mockRestore();
    Logger.error.mockRestore();
  });

  it('should render fetched message', async () => {
    // Arrange
    const multiFetch = (url) => {
      if (url === 'http://localhost:3000/api/admin') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(adminMessage),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(courses),
      });
    };
    global.fetch.mockImplementation(multiFetch);

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
  it('should throw exception with bad response', () => {
    // Arrange
    const multiFetch = (url) => {
      if (url === 'http://localhost:3000/api/admin') {
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve(adminMessage),
        });
      }
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve(courses),
      });
    };
    global.fetch.mockImplementation(multiFetch);

    // Arrange
    const { getByText } = render(
      <Router>
        <AuthContext.Provider value={auth}>
          <Courses />
        </AuthContext.Provider>
      </Router>,
    );

    // Assert
    waitForElement(() => getByText(/Network response was not good/));
  });
});
