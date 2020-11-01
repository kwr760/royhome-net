import React from 'react';
import { render } from '@testing-library/react';
import { EducationType } from '../../../../../types/resume.types';

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
    const education: EducationType[] = [];

    // Act
    const { getByText } = render(
      <ResumeEducation education={education}/>,
    );

    // Assert
    getByText('Education');
  });
});
