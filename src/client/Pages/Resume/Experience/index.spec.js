import React from 'react';
import { render } from '@testing-library/react';

import ResumeExperience from './index';

describe('client/Components/Pages/Resume/Experience', () => {
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <ResumeExperience />,
    );

    // Assert
    getByText('Resume Experience');
  });
});
