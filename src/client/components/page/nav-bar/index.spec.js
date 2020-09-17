import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import NavBar from './index';

jest.mock('./nav-tabs', () => () => (<div>Nav Tabs</div>));
jest.mock('./nav-profile', () => () => (<div>Nav Profile</div>));
jest.mock('./nav-toggler', () => () => (<div>Nav Toggler</div>));
jest.mock('../dark-button', () => () => (<div>Dark Button</div>));

describe('client/components/page/nav-bar', () => {
  const getNavBar = () => (
    <NavBar />
  );
  it('should render', () => {
    // Arrange
    // Act
    const { getByText, getByTestId } = render(getNavBar());

    // Assert
    getByText(/Nav Tabs/);
    getByText(/Nav Profile/);
    getByText(/Nav Toggler/);
    getByText(/Dark Button/);

    fireEvent.click(getByTestId('navbar-toggler'));
  });
});
