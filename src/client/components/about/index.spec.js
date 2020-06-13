import React from 'react';
import { render } from '@testing-library/react';

import About from './index';

describe('client/components/about', () => {
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <About />,
    );

    // Assert
    getByText(/nodejs/);
    getByText(/React frontend and with SSR and api backend/);
  });
});
