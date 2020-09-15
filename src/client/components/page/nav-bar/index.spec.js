import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import NavBar from './index';

jest.mock('./nav-tabs', () => () => (<div>Nav Tabs</div>));
jest.mock('./nav-profile', () => () => (<div>Nav Profile</div>));
jest.mock('./nav-toggler', () => () => (<div>Nav Toggler</div>));
jest.mock('../dark-mode', () => () => (<div>Dark Mode</div>));

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
    getByText(/Dark Mode/);

    fireEvent.click(getByTestId('navbar-toggler'));
  });
});
