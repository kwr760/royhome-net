import React from 'react';
import { render } from '@testing-library/react';

import Resume from './index';

describe('client/components/Pages/resume/resume', () => {
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <Resume />,
    );

    // Assert
    getByText('resume header');
    getByText('resume summary');
    getByText('resume skills');
    getByText('resume experience');
    getByText('resume education');
  });
});
