import React from 'react';
import { render } from '@testing-library/react';

import Resume from './index';

describe('client/Components/Pages/Resume/Resume', () => {
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <Resume />,
    );

    // Assert
    getByText('Resume Header');
    getByText('Resume Summary');
    getByText('Resume Skills');
    getByText('Resume Experience');
    getByText('Resume Education');
  });
});
