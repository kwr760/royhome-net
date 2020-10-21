import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Auth0Context } from '../../../../util/auth0/auth0-context';
import NavLogin from './nav-login';

describe('client/components/page/nav-bar/nav-login', () => {
  const getNavLogin = (auth) => (
    <Auth0Context.Provider value={auth}>
      <NavLogin />
    </Auth0Context.Provider>
  );
  it('should render the nav login button', () => {
    // Arrange
    const auth = {
      login: jest.fn(),
    };

    // Act
    const { getByText } = render(getNavLogin(auth));
    fireEvent.click(getByText(/Log in/));

    // Assert
    expect(auth.login).toHaveBeenCalledTimes(1);
  });
});