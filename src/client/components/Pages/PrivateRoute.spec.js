import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import PrivateRoute from './PrivateRoute';
import { Auth0Context } from '../../../util/auth0/context';

describe('client/components/Pages/PrivateRoute', () => {
  it('should render with authentication and role', () => {
    // Arrange
    const auth = {
      isAuthenticated: true,
      userHasRole: jest.fn(() => true),
    };
    const mockComponent = () => <div>Mocked</div>;

    // Act
    const { getByText } = render(
      <Router>
        <Auth0Context.Provider value={auth}>
          <PrivateRoute component={mockComponent} userRole="admin" />
        </Auth0Context.Provider>
      </Router>,
    );

    // Assert
    getByText(/Mocked/);
  });
  it('should render something without role', () => {
    // Arrange
    const auth = {
      isAuthenticated: true,
      userHasRole: jest.fn(() => false),
    };
    const mockComponent = () => <div>Mocked</div>;

    // Act
    const { getByText } = render(
      <Router>
        <Auth0Context.Provider value={auth}>
          <PrivateRoute component={mockComponent} userRole="admin" />
        </Auth0Context.Provider>
      </Router>,
    );

    // Assert
    getByText(/admin/);
    getByText(/Unauthorized - You need the following role to view this page:/);
  });
});
