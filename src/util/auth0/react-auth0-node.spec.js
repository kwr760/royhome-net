import React from 'react';
import { render } from '@testing-library/react';

import Auth0Provider from './react-auth0-node';
import { useAuth0 } from './context';

describe('util/auth0/react-auth0-node', () => {
  const TestConsumer = () => {
    const {
      isAuthenticated,
      user,
      loading,
      popupOpen,
      loginWithPopup,
      handleRedirectCallback,
      getIdTokenClaims,
      loginWithRedirect,
      getTokenSilently,
      getTokenWithPopup,
      logout,
      userHasRole,
    } = useAuth0();

    return (
      <div>
        { `isAuthenticated: ${isAuthenticated}` }
        { `user: ${JSON.stringify(user)}` }
        { `loading: ${loading}` }
        { `popupOpen: ${popupOpen}` }
        { `loginWithPopup: ${loginWithPopup()}` }
        { `handleRedirectCallback: ${handleRedirectCallback()}` }
        { `getIdTokenClaims: ${getIdTokenClaims()}` }
        { `loginWithRedirect: ${loginWithRedirect()}` }
        { `getTokenSilently: ${getTokenSilently()}` }
        { `getTokenWithPopup: ${getTokenWithPopup()}` }
        { `logout: ${logout()}` }
        { `userHasRole: ${userHasRole('friend')}` }
      </div>
    );
  };
  it('should populate a Provider', () => {
    // Arrange
    const context = {
      jwt: {
        expiresAt: 99999999999999,
        user: {
          name: 'Test',
        },
        data: {
          key: 'Value',
        },
      },
    };
    const provider = (
      <Auth0Provider context={context}>
        <TestConsumer />
      </Auth0Provider>
    );

    // Act
    const { getByText } = render(provider);

    // Assert
    getByText(/isAuthenticated: true/);
    getByText(/user: {"name":"Test"}/);
    getByText(/loading: false/);
    getByText(/popupOpen: false/);
    getByText(/loginWithPopup: undefined/);
    getByText(/handleRedirectCallback: undefined/);
    getByText(/getIdTokenClaims: undefined/);
    getByText(/loginWithRedirect: undefined/);
    getByText(/getTokenSilently: undefined/);
    getByText(/getTokenWithPopup: undefined/);
    getByText(/logout: undefined/);
    getByText(/userHasRole: false/);
  });
});
