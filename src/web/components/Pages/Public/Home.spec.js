import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import Home from './Home';
import AuthContext from '../../Auth/AuthContext';

jest.mock('../../Auth/Auth');

describe('web/components/Pages/Public/Home', () => {
  it('should render an unauthenticated page', () => {
    // Arrange
    const auth = {
      isAuthenticated: jest.fn(() => false),
      login: jest.fn(),
    };

    // Act
    const { getByText } = render(
      <AuthContext.Provider value={auth}>
        <Home />
      </AuthContext.Provider>,
    );

    // Assert
    getByText('Login');
  });

  it('should render an authenticated page', () => {
    // Arrange
    const auth = {
      isAuthenticated: jest.fn(() => true),
      login: jest.fn(),
    };

    // Act
    const { getByText } = render(
      <Router>
        <AuthContext.Provider value={auth}>
          <Home />
        </AuthContext.Provider>
      </Router>,
    );

    // Assert
    getByText('View profile');
  });
});
