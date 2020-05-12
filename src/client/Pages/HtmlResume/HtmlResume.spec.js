import React from 'react';
import { render } from '@testing-library/react';

import HtmlResume from './HtmlResume';

describe('client/Components/Pages/Public/HtmlResume', () => {
  it('should render staticresume html', async () => {
    // Arrange
    const { container } = render(<HtmlResume />);

    expect(container).toMatchSnapshot();
  });
});
