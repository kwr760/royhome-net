import React from 'react';
import { render } from '@testing-library/react';

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
    getByText('summary');
  });
  it('should render without props', () => {
    // Arrange
    // Act
    const { getByText } = render(
      <ResumeSummary />,
    );

    // Assert
    getByText('Summary');
  });
});
