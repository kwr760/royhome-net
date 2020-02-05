import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import NavBar from './NavBar';
import Context from '../Context';
import initFontAwesome from '../initFontAwesome';

initFontAwesome();

jest.mock('../Auth/Auth');

describe('client/components/Pages/NavBar', () => {
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
        <Context.Provider value={auth}>
          <NavBar />
        </Context.Provider>
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
