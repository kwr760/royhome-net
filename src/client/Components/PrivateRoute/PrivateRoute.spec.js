import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import PrivateRoute from './PrivateRoute';
import { Auth0Context } from '../../../util/auth0/context';

describe('client/Components/Pages/PrivateRoute', () => {
  const userRole = 'admin';
  const mockComponent = () => <div>Mocked</div>;
  const getPrivateRoute = (auth, role, path) => (
    <Router>
      <Auth0Context.Provider value={auth}>
        <PrivateRoute component={mockComponent} userRole={role} path={path} />
      </Auth0Context.Provider>
    </Router>
  );

  it('should render with authentication and role', () => {
    // Arrange
    const auth = {
      isAuthenticated: true,
      userHasRole: jest.fn(() => true),
    };

    // Act
    const { getByText } = render(getPrivateRoute(auth, userRole));

    // Assert
    getByText(/Mocked/);
  });
  it('should render error message without role', () => {
    // Arrange
    const auth = {
      isAuthenticated: true,
      userHasRole: jest.fn(() => false),
    };

    // Act
    const { getByText } = render(getPrivateRoute(auth, userRole));

    // Assert
    getByText(/admin/);
    getByText(/Unauthorized - You need the following role to view this page:/);
  });
  it('should login without authentication', async () => {
    // Arrange
    const path = 'http://url/path';
    const auth = {
      isAuthenticated: false,
      userHasRole: jest.fn(() => true),
      loginWithRedirect: jest.fn(),
    };

    // Act
    render(getPrivateRoute(auth, userRole, path));

    // Assert
    expect(auth.loginWithRedirect).toHaveBeenCalledWith({ appState: { targetUrl: 'http://url/path' } });
  });
});
