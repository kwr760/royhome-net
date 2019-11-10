import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Courses from './Courses';

describe('web/components/Pages/Private/Courses', () => {
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
    const auth = {
      getAccessToken: jest.fn(),
    };

    const coursesFetch = () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        courses: [
          { id: 1, title: 'Course #1' },
          { id: 2, title: 'Course #2' },
        ],
      }),
    });
    const adminMessage = {
      message: 'Hello to an admin!',
    };
    const adminFetch = () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(adminMessage),
    });

    global.fetch
      .mockImplementationOnce(coursesFetch)
      .mockImplementationOnce(adminFetch);

    // Arrange
    const { getByText } = render(<Courses auth={auth} />);

    await waitForElement(() => getByText(/Course #1/));
    getByText(/Course #2/);
    expect(console.log).toBeCalledWith(adminMessage);
  });
});
