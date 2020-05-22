import React from 'react';
import { render } from '@testing-library/react';

import HtmlResume from './html-resume';

describe('client/components/html-resume', () => {
  it('should render staticresume html', async () => {
    // Arrange
    const { container } = render(<HtmlResume />);

    expect(container).toMatchSnapshot();
  });
});
