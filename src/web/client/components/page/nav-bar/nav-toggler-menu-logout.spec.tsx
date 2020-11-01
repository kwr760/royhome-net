import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { FiLogOut } from 'react-icons/fi';
import { Auth0ContextType } from '../../../../types/auth0.types';

import { Auth0Context } from '../../../../util/auth0/auth0-context';
import NavTogglerMenuLogout from './nav-toggler-menu-logout';

jest.mock('react-icons/fi');

describe('client/components/page/nav-bar/nav-toggler-menu-logout', () => {
  const getComponent = (auth: Auth0ContextType, name: string) => (
    <Auth0Context.Provider value={auth}>
      <Router>
        <NavTogglerMenuLogout name={name} />
      </Router>
    </Auth0Context.Provider>
  );
  it('should render the logout and click button', () => {
    // Arrange
    const auth = {
      logout: jest.fn(),
    } as unknown as Auth0ContextType;
    (FiLogOut as jest.Mock).mockImplementation(() => 'FiLogOut');

    // Act
    const { getByText } = render(getComponent(auth, 'Logout'));
    const button = getByText(/Logout/);
    fireEvent.click(button);

    // Assert
    getByText(/FiLogOut/);
    getByText(/Logout/);
    expect(auth.logout).toHaveBeenCalledTimes(1);
  });
});
