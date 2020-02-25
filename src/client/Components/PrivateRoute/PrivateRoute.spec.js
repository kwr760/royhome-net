import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import PrivateRoute from './PrivateRoute';
import { Auth0Context } from '../../../util/auth0/context';

describe('client/Components/Pages/PrivateRoute', () => {
  const userRole = 'admin';
  const mockComponent = () => <div>Mocked</div>;
  const getPrivateRoute = (auth, role) => (
    <Router>
      <Auth0Context.Provider value={auth}>
        <PrivateRoute component={mockComponent} userRole={role} />
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
  it('should render something without role', () => {
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
});
