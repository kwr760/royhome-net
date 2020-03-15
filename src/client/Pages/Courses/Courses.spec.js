import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Courses from './Courses';
import { Auth0Context } from '../../../util/auth0/context';

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: {} }),
}));

describe('client/Components/Pages/Private/Courses', () => {
  const courses = {
    courses: [
      { id: 1, title: 'Course #1' },
      { id: 2, title: 'Course #2' },
    ],
  };
  const auth = {
    getTokenSilently: jest.fn(),
  };
  const emptyContext = {};
  const getCourses = (context) => (
    <Auth0Context.Provider value={auth}>
      <Router>
        <Courses context={context} />
      </Router>
    </Auth0Context.Provider>
  );

  it('should render request', async () => {
    // Arrange
    axios.get
      .mockResolvedValueOnce({
        data: courses,
      });

    // Act
    const { getByText } = render(getCourses());

    // Assert
    await waitForElement(() => getByText(/Course #1/));
    getByText(/Course #2/);
  });
  it('should throw exception with bad response', async () => {
    // Arrange
    axios.get
      .mockRejectedValue(new Error('Request failed with status code 500'));

    // Act
    const { getByText } = render(getCourses(emptyContext));

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

    // Act
    const { getByText } = render(getCourses(context));

    // Assert
    await waitForElement(() => getByText(/Course #3/));
    getByText(/Course #3/);
  });
});
