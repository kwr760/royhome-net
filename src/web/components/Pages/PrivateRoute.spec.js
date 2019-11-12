import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import PrivateRoute from './PrivateRoute';
import AuthContext from '../Auth/AuthContext';

jest.mock('../Auth/Auth');

describe('web/components/Pages/PrivateRoute', () => {
  it('should render with authentication and role', () => {
    // Arrange
    const auth = {
      isAuthenticated: jest.fn(() => true),
      login: jest.fn(),
      userHasRole: jest.fn(() => true),
    };
    const mockComponent = () => <div>Mocked</div>;

    // Act
    const { getByText } = render(
      <Router>
        <AuthContext.Provider value={auth}>
          <PrivateRoute component={mockComponent} userRole="admin" />
        </AuthContext.Provider>
      </Router>,
    );

    // Assert
    getByText(/Mocked/);
  });
  it('should render something without role', () => {
    // Arrange
    const auth = {
      isAuthenticated: jest.fn(() => true),
      login: jest.fn(),
      userHasRole: jest.fn(() => false),
    };
    const mockComponent = () => <div>Mocked</div>;

    // Act
    const { getByText } = render(
      <Router>
        <AuthContext.Provider value={auth}>
          <PrivateRoute component={mockComponent} userRole="admin" />
        </AuthContext.Provider>
      </Router>,
    );

    // Assert
    getByText(/admin/);
    getByText(/Unauthorized - You need the following role to view this page:/);
  });
  it('should render something without authenticated', () => {
    // Arrange
    const auth = {
      isAuthenticated: jest.fn(() => false),
      login: jest.fn(),
      userHasRole: jest.fn(() => false),
    };
    const mockComponent = () => <div>Mocked</div>;

    // Act
    const { getByText } = render(
      <Router>
        <AuthContext.Provider value={auth}>
          <PrivateRoute component={mockComponent} userRole="admin" />
        </AuthContext.Provider>
      </Router>,
    );

    // Assert
    expect(auth.login).toBeCalled();
  });
});
