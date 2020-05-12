import React from 'react';
import { render } from '@testing-library/react';

import ResumeExperience from './index';

describe('client/Components/Pages/Resume/Experience', () => {
  xit('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <ResumeExperience />,
    );

    // Assert
    getByText('Resume Experience');
  });
});
