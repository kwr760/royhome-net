import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Courses from './Courses';
import Logger from '../../../logger';
import { Auth0Context } from '../../../../util/auth0/context';

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: {} }),
}));

describe('client/components/Pages/Private/Courses', () => {
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
    getTokenSilently: jest.fn(),
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
      <Auth0Context.Provider value={auth}>
        <Router>
          <Courses />
        </Router>
      </Auth0Context.Provider>,
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
      <Auth0Context.Provider value={auth}>
        <Router>
          <Courses />
        </Router>
      </Auth0Context.Provider>,
    );

    // Assert
    await waitForElement(() => getByText(/Request failed with status code 500/));
  });
  it('should load courses from context', async () => {
    // Arrange
    const context = {
      data: {
        courses: {
          status: 200,
          body: {
            courses: [
              { id: 3, title: 'Course #3' },
            ],
          },
        },
      },
    };

    // Arrange
    const { getByText } = render(
      <Auth0Context.Provider value={auth}>
        <Router>
          <Courses context={context} />
        </Router>
      </Auth0Context.Provider>,
    );

    await waitForElement(() => getByText(/Course #3/));
    getByText(/Course #3/);
  });
});
