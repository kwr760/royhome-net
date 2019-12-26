import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import Nav from './Nav';
import AuthContext from '../Auth/AuthContext';

jest.mock('../Auth/Auth');

describe('client/components/Pages/Nav', () => {
  it('should render with authentication and role', () => {
    // Arrange
    const auth = {
      isAuthenticated: jest.fn(() => true),
      login: jest.fn(),
      logout: jest.fn(),
      userHasRole: jest.fn(() => true),
    };

    // Act
    const { getByText } = render(
      <Router>
        <AuthContext.Provider value={auth}>
          <Nav />
        </AuthContext.Provider>
      </Router>,
    );

    // Assert
    getByText(/Kevin/);
    getByText(/Resume/);
    getByText(/Profile/);
    getByText(/Private/);
    getByText(/Courses/);
    getByText(/Log Out/);
  });
});
