import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import Home from './Home';
import { Auth0Context } from '../../../util/auth0/context';

describe('client/Components/Pages/Public/Home', () => {
  it('should render an unauthenticated page', () => {
    // Arrange
    const auth = {
      isAuthenticated: false,
      loginWithRedirect: jest.fn(),
    };
    const location = {
      hash: 'http://url/',
    };

    // Act
    const { getByText } = render(
      <Auth0Context.Provider value={auth}>
        <Home location={location} />
      </Auth0Context.Provider>,
    );

    // Assert
    getByText('Log in');

    fireEvent.click(getByText('Log in'));
    expect(auth.loginWithRedirect).toHaveBeenCalled();
  });

  it('should render an authenticated page', () => {
    // Arrange
    const auth = {
      isAuthenticated: true,
      login: jest.fn(),
      handleAuthentication: jest.fn(),
    };
    const location = {
      hash: 'http://url/',
    };

    // Act
    const { getByText } = render(
      <Router>
        <Auth0Context.Provider value={auth}>
          <Home location={location} />
        </Auth0Context.Provider>
      </Router>,
    );

    // Assert
    getByText('View profile');
  });
});
