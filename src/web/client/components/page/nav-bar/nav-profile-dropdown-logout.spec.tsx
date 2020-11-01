import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { UncontrolledDropdown } from 'reactstrap';
import { FiLogOut } from 'react-icons/fi';
import { Auth0ContextType } from '../../../../types/auth0.types';

import { Auth0Context } from '../../../../util/auth0/auth0-context';
import NavProfileDropDownLogout from './nav-profile-dropdown-logout';

jest.mock('react-icons/fi');

describe('client/components/page/nav-bar/nav-profile-dropdown-logout', () => {
  const getComponent = (auth: Auth0ContextType, name: string) => (
    <Auth0Context.Provider value={auth}>
      <UncontrolledDropdown>
        <NavProfileDropDownLogout name={name} />
      </UncontrolledDropdown>
    </Auth0Context.Provider>
  );
  it('should render the logout and click button', () => {
    // Arrange
    const auth = {
      login: jest.fn(),
      logout: jest.fn(),
      getToken: jest.fn(),
    };
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
