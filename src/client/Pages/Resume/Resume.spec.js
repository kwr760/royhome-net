import React from 'react';
import { render } from '@testing-library/react';

import Resume from './Resume';

describe('client/Components/Pages/Public/Resume', () => {
  it('should render resume html', async () => {
    // Arrange
    const { container } = render(<Resume />);

    expect(container).toMatchSnapshot();
  });
});
