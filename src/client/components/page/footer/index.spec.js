import React from 'react';
import { render } from '@testing-library/react';

import Footer from './index';

describe('src/client/components/page/footer', () => {
  it('renders', () => {
    // Arrange/Act
    const { getByTestId } = render(
      <Footer />,
    );

    // Assert
    getByTestId(/footer-logo/);
  });
});
