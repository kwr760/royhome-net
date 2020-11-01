import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { Auth0ContextType } from '../../../../types/auth0.types';

import { Auth0Context } from '../../../../util/auth0/auth0-context';
import NavTogglerButton from './nav-toggler-button';

jest.mock('react-icons/fi');

describe('client/components/page/nav-bar/nav-toggler-menu-button', () => {
  const getComponent = (auth: Auth0ContextType) => (
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
      logout: jest.fn(),
      getToken: jest.fn(),
    };
    (FiLogIn as jest.Mock).mockImplementation(() => 'FiLogIn');

    // Act
    const { getByText } = render(getComponent(auth));
    fireEvent.click(getByText(/Log in/));

    // Assert
    getByText(/FiLogIn/);
    expect(auth.login).toHaveBeenCalledTimes(1);
  });
});
