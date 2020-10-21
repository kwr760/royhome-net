import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { FiLogOut } from 'react-icons/fi';

import NavTogglerMenuItem from './nav-toggler-menu-item';

jest.mock('react-icons/fi');

describe('client/components/page/nav-bar/nav-toggler-menu-item', () => {
  const getComponent = (path, name, icon) => (
    <Router>
      <NavTogglerMenuItem path={path} name={name} icon={icon} />
    </Router>
  );
  it('should render the dropdown', () => {
    // Arrange
    (FiLogOut as jest.Mock).mockImplementation(() => 'MockIcon');

    // Act
    const { getByText, getByRole } = render(getComponent('/path', 'Name', <FiLogOut />));

    // Assert
    getByText(/Name/);
    getByRole('listitem');
    const link = getByRole('link') as unknown as Location;
    expect(link.pathname).toBe('/path');
    getByText(/MockIcon/);
  });
});
