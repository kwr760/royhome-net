import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';
import { Auth0Context } from '../../../util/auth0/context';

describe('client/Components/Pages/Public/Home', () => {
  it('should render', () => {
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
    getByText('This is the home page of Kevin Roy');
  });
});
