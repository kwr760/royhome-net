import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import NavBar from './index';
import NavTabs from './nav-tabs';
import NavProfile from './nav-profile';
import NavToggler from './nav-toggler';
import DarkButton from '../dark-button';

jest.mock('./nav-tabs');
jest.mock('./nav-profile');
jest.mock('./nav-toggler');
jest.mock('../dark-button');

describe('client/components/page/nav-bar', () => {
  const getNavBar = () => (
    <NavBar />
  );
  it('should render', () => {
    // Arrange
    (NavTabs as jest.Mock).mockImplementation(() => <div>Nav Tabs</div>);
    (NavProfile as jest.Mock).mockImplementation(() => <div>Nav Profile</div>);
    (NavToggler as jest.Mock).mockImplementation(() => <div>Nav Toggler</div>);
    (DarkButton as jest.Mock).mockImplementation(() => <div>Dark Button</div>);
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
