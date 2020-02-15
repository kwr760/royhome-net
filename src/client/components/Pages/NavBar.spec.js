import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import NavBar from './NavBar';
import { Auth0Context } from '../../../util/auth0/context';
import initFontAwesome from '../initFontAwesome';

initFontAwesome();

describe('client/components/Pages/NavBar', () => {
  it('should render with authentication and role', () => {
    // Arrange
    const auth = {
      isAuthenticated: true,
      logout: jest.fn(),
      userHasRole: jest.fn(() => true),
    };

    // Act
    const { getByText, getByTestId } = render(
      <Auth0Context.Provider value={auth}>
        <Router>
          <NavBar />
        </Router>
      </Auth0Context.Provider>,
    );

    // Assert
    getByText(/Home/);
    getByText(/Resume/);
    getByText(/Profile/);
    getByText(/Courses/);
    getByText(/Log out/);

    fireEvent.click(getByText('Log out'));
    expect(auth.logout).toHaveBeenCalled();

    fireEvent.click(getByTestId('navbar-toggler'));
  });
  it('should render without authentication and role', () => {
    // Arrange
    const auth = {
      isAuthenticated: false,
      loginWithRedirect: jest.fn(),
      logout: jest.fn(),
      userHasRole: jest.fn(() => true),
    };

    // Act
    const { getByText } = render(
      <Auth0Context.Provider value={auth}>
        <Router>
          <NavBar />
        </Router>
      </Auth0Context.Provider>,
    );

    // Assert
    getByText(/Home/);
    getByText(/Resume/);
    getByText(/Log in/);

    fireEvent.click(getByText('Log in'));
    expect(auth.loginWithRedirect).toHaveBeenCalled();
  });
});
