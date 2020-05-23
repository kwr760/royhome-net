import React from 'react';
import { render } from '@testing-library/react';

import ResumeHeader from './index';

describe('client/components/resume/header', () => {
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <ResumeHeader />,
    );

    // Assert
    getByText('Address');
    getByText('Owner');
    getByText('Contact');
  });
});
