import React from 'react';
import { render } from '@testing-library/react';

import Resume from './index';

describe('client/components/resume/resume', () => {
  it('should render', () => {
    // Arrange
    const resume = {
      contact: {
        phone: 'phone',
        email: 'email',
        displayPhone: false,
      },
      address: {
        address: 'address',
      },
      owner: {
        name: 'name',
      },
    };

    // Act
    const { getByText } = render(
      <Resume resume={resume} />,
    );

    // Assert
    getByText('address');
    getByText('email');
    getByText('name');
    getByText('Summary');
    getByText('Resume Skills');
    getByText('Resume Experience');
    getByText('Resume Education');
  });
  it('should render with empty object', () => {
    // Arrange
    // Act
    const { getByText } = render(
      <Resume />,
    );

    // Assert
    getByText('Cell upon request');
    getByText('Summary');
    getByText('Resume Skills');
    getByText('Resume Experience');
    getByText('Resume Education');
  });
});
