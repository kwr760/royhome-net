import React from 'react';
import { render } from '@testing-library/react';

import ResumeSkills from './index';

describe('client/components/resume/skills', () => {
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <ResumeSkills />,
    );

    // Assert
    getByText('Resume Skills');
  });
});
