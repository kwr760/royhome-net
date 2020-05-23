import React from 'react';
import { render } from '@testing-library/react';

import ResumeExperience from './index';

describe('client/components/resume/experience', () => {
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <ResumeExperience />,
    );

    // Assert
    getByText('Resume Experience');
  });
});
