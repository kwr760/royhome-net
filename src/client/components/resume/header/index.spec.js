import React from 'react';
import { render } from '@testing-library/react';

import ResumeHeader from './index';

describe('client/components/resume/header', () => {
  xit('should render', () => {
    // Arrange
    const owner = {
      name: 'name',
    };
    const contact = {
      phone: 'phone',
      email: 'email',
      displayPhone: false,
    };
    const address = {
      address: 'address',
    };

    // Act
    const { getByText } = render(
      <ResumeHeader owner={owner} contact={contact} address={address}/>,
    );

    // Assert
    getByText('address');
    getByText('name');
    getByText('email');
  });
  it('should render with phone', () => {
    // Arrange
    const owner = {
      name: 'name',
    };
    const contact = {
      phone: 'phone',
      email: 'email',
      displayPhone: true,
    };
    const address = {
      address: 'address',
    };

    // Act
    const { getByText } = render(
      <ResumeHeader owner={owner} contact={contact} address={address}/>,
    );

    // Assert
    getByText('address');
    getByText('name');
    getByText('email');
    getByText('phone');
  });
  it('should render without props', () => {
    // Arrange
    // Act
    const { getByText } = render(
      <ResumeHeader />,
    );

    // Assert
    getByText('Cell upon request');
  });
});
