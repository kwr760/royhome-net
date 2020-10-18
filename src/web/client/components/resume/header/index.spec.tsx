import React from 'react';
import { render } from '@testing-library/react';
import { AddressType, ContactType, OwnerType } from '../../../../types/resume.types';

import ResumeHeader from './index';

describe('client/components/resume/header', () => {
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
      <ResumeHeader owner={owner} contact={contact} address={address} />,
    );

    // Assert
    getByText('address');
    getByText('name');
    getByText('email');
    getByText('phone');
  });
  it('should render without props', () => {
    // Arrange
    const owner = {} as OwnerType;
    const contact = {} as ContactType;
    const address = {} as AddressType;

    // Act
    const { getByText } = render(
      <ResumeHeader owner={owner} contact={contact} address={address} />,
    );

    // Assert
    getByText('Cell upon request');
  });
});
