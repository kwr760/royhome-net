import React from 'react';
import { render } from '@testing-library/react';

import Kevin from './index';

describe('client/components/kevin', () => {
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <Kevin />,
    );

    // Assert
    getByText(/about myself/);
  });
});
