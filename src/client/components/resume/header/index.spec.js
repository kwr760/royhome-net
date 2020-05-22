import React from 'react';
import { render } from '@testing-library/react';

import ResumeHeader from './index';

describe('client/components/Pages/resume/header', () => {
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <ResumeHeader />,
    );

    // Assert
    getByText('resume header');
  });
});
