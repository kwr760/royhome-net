import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Private from './Private';

describe('web/components/Pages/Public/Private', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  afterEach(() => {
    global.fetch.mockRestore();
  });

  it('should render fetched message', async () => {
    // Arrange
    const message = 'test-message';
    const auth = {
      getAccessToken: jest.fn(),
    };

    global.fetch.mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message }),
    }));

    // Arrange
    const { getByText } = render(<Private auth={auth} />);

    const txt = await waitForElement(() => getByText(message));
    expect(txt).toHaveTextContent(message);
    expect(auth.getAccessToken).toBeCalled();
  });
});
