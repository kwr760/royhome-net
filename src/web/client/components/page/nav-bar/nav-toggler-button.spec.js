import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import { Auth0Context } from '@web/util/auth0/auth0-context';
import NavTogglerButton from './nav-toggler-button';

jest.mock('react-icons/fi');

describe('client/components/page/nav-bar/nav-toggler-menu-button', () => {
  const getComponent = (auth) => (
    <Auth0Context.Provider value={auth}>
      <Router>
        <NavTogglerButton />
      </Router>
    </Auth0Context.Provider>
  );
  it('should render the dropdown', () => {
    // Arrange
    const auth = {
      login: jest.fn(),
    };
    FiLogIn.mockImplementation(({ icon }) => 'FiLogIn');

    // Act
    const { getByText } = render(getComponent(auth));
    fireEvent.click(getByText(/Log in/));

    // Assert
    getByText(/FiLogIn/);
    expect(auth.login).toHaveBeenCalledTimes(1);
  });
});
