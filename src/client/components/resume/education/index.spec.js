import React from 'react';
import { render } from '@testing-library/react';

import ResumeEducation from './index';

describe('client/components/Pages/resume/education', () => {
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <ResumeEducation />,
    );

    // Assert
    getByText('resume education');
  });
});
