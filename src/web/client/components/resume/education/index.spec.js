import React from 'react';
import { render } from '@testing-library/react';

import ResumeEducation from './index';

describe('client/components/resume/education', () => {
  it('should render', () => {
    // Arrange
    const education = [{
      degree: 'degree',
      school: 'school',
      graduationDate: 'Month Year',
    }];

    // Act
    const { getByText } = render(
      <ResumeEducation education={education} />,
    );

    // Assert
    getByText('degree,');
    getByText('school');
    getByText('Month Year');
  });
  it('should render without props', () => {
    // Arrange
    // Act
    const { getByText } = render(
      <ResumeEducation />,
    );

    // Assert
    getByText('Education');
  });
});
