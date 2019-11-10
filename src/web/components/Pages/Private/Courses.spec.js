import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Courses from './Courses';

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
    global.console.log = jest.fn();
  });
  afterEach(() => {
    global.fetch.mockRestore();
    global.console.log.mockRestore();
  });

  it('should render fetched message', async () => {
    // Arrange
    const multiFetch = (url) => {
      if (url === 'http://localhost:9100/api/admin') {
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
    const { getByText } = render(<Courses auth={auth} />);

    await waitForElement(() => getByText(/Course #1/));
    getByText(/Course #2/);
    expect(console.log).toBeCalledWith(adminMessage);
  });
  it('should throw exception with bad response', () => {
    // Arrange
    const multiFetch = (url) => {
      if (url === 'http://localhost:9100/api/admin') {
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
    const { getByText } = render(<Courses auth={auth} />);

    // Assert
    waitForElement(() => getByText(/Network response was not good/));
  });
});
