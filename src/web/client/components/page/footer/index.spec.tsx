import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { render } from '@testing-library/react';
import themeLight from '../../../theme-light';

import Footer from './index';

describe('src/client/components/page/footer', () => {
  it('renders', () => {
    // Arrange/Act
    const { getByRole, getByText } = render(
      <ThemeProvider theme={themeLight}>
        <Footer />
      </ThemeProvider>,
    );

    // Assert
    getByRole(/link/);
    getByText(/Link to github/);
  });
});
