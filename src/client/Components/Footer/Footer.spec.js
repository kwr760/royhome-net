import React from 'react';
import { render } from '@testing-library/react';

import Footer from './Footer';

describe('src/client/Components/Footer', () => {
  it('renders', () => {
    // Arrange/Act
    const { getByTestId } = render(
      <Footer />,
    );

    // Assert
    getByTestId(/footer-logo/);
  });
});
