import React from 'react';
import { render } from '@testing-library/react';

import ResumeHeader from './index';

describe('client/Components/Pages/Resume/Header', () => {
  xit('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <ResumeHeader />,
    );

    // Assert
    getByText('Resume Header');
  });
});
