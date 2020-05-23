import React from 'react';
import { render } from '@testing-library/react';

import ResumeSummary from './index';

describe('client/components/resume/summary', () => {
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <ResumeSummary />,
    );

    // Assert
    getByText('Resume Summary');
  });
});
