import React from 'react';
import { render } from '@testing-library/react';
import { SummaryType } from '../../../../types/resume.types';

import ResumeSummary from './index';

describe('client/components/resume/summary', () => {
  it('should render', () => {
    // Arrange
    const summary = {
      summary: 'summary',
    };

    // Act
    const { getByText } = render(
      <ResumeSummary summary={summary} />,
    );

    // Assert
    getByText(/summary/);
  });
  it('should render without props', () => {
    // Arrange
    const summary = {} as SummaryType;

    // Act
    const { getByText } = render(
      <ResumeSummary summary={summary}/>,
    );

    // Assert
    getByText(/Summary/);
  });
});
