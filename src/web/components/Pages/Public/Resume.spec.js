import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Resume from './Resume';

describe('web/components/Pages/Public/Resume', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  afterEach(() => {
    global.fetch.mockRestore();
  });

  it('should render fetched message', async () => {
    const message = 'test-message';

    global.fetch.mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message }),
    }));

    // Arrange
    const { getByText } = render(<Resume />);

    const txt = await waitForElement(() => getByText(message));
    expect(txt).toHaveTextContent(message);
  });
});
