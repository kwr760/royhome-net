import React from 'react';
import { render } from '@testing-library/react';

import Footer from './Footer';
import initFontAwesome from '../../util/init-font-awesome';

initFontAwesome();

describe('src/client/Components/Footer', () => {
  xit('renders', () => {
    // Arrange/Act
    const { getByTestId } = render(
      <Footer />,
    );

    // Assert
    getByTestId(/footer-logo/);
  });
});
