import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { FiLogOut } from 'react-icons/fi';

import { Auth0Context } from '@src/util/auth0/auth0-context';
import NavTogglerMenuLogout from './nav-toggler-menu-logout';

jest.mock('react-icons/fi');

describe('client/components/page/nav-bar/nav-toggler-menu-logout', () => {
  const getComponent = (auth, name, icon) => (
    <Auth0Context.Provider value={auth}>
      <Router>
        <NavTogglerMenuLogout name={name} icon={icon} />
      </Router>
    </Auth0Context.Provider>
  );
  it('should render the logout and click button', () => {
    // Arrange
    const auth = {
      logout: jest.fn(),
    };
    FiLogOut.mockImplementation(({ icon }) => 'FiLogOut');

    // Act
    const { getByText } = render(getComponent(auth, 'Logout', 'test-icon'));
    const button = getByText(/Logout/);
    fireEvent.click(button);

    // Assert
    getByText(/FiLogOut/);
    getByText(/Logout/);
    expect(auth.logout).toHaveBeenCalledTimes(1);
  });
});
