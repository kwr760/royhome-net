import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { Auth0Context } from '@src/util/auth0/auth0-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter as Router } from 'react-router-dom';
import NavTogglerMenuLogout from './nav-toggler-menu-logout';

jest.mock('@fortawesome/react-fontawesome');

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
    FontAwesomeIcon.mockImplementation(({ icon }) => `Icon: ${icon}`);

    // Act
    const { getByText } = render(getComponent(auth, 'Logout', 'test-icon'));
    const button = getByText(/Logout/);
    fireEvent.click(button);

    // Assert
    getByText(/Icon: test-icon/);
    getByText(/Logout/);
    expect(auth.logout).toHaveBeenCalledTimes(1);
  });
});
