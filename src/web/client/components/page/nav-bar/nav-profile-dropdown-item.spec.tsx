import React from 'react';
import { render } from '@testing-library/react';
import { FiLogOut } from 'react-icons/fi';

import { BrowserRouter as Router } from 'react-router-dom';
import NavProfileDropDownItem from './nav-profile-dropdown-item';

jest.mock('react-icons/fi');

describe('client/components/page/nav-bar/nav-profile-dropdown-item', () => {
  const getComponent = (path: string, name: string, icon: JSX.Element) => (
    <Router>
      <NavProfileDropDownItem path={path} name={name} icon={icon} />
    </Router>
  );
  it('should render the dropdown', () => {
    // Arrange
    (FiLogOut as jest.Mock).mockImplementation(() => 'MockIcon');

    // Act
    const { getByText, getByRole } = render(getComponent('/path', 'Name', <FiLogOut />));

    // Assert
    getByText(/Name/);
    getByRole('menuitem');
    getByText(/MockIcon/);
  });
});
