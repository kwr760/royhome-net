import React from 'react';
import { render } from '@testing-library/react';

import Auth0Provider from './react-auth0-node';
import { useAuth0 } from './context';

describe('util/auth0/react-auth0-node', () => {
  const TestConsumer = () => {
    const {
      user,
      loading,
      logout,
      loginWithRedirect,
      getTokenSilently,
      userHasRole,
    } = useAuth0();

    return (
      <div>
        { `user: ${JSON.stringify(user)}` }
        { `loading: ${loading}` }
        { `loginWithRedirect: ${loginWithRedirect()}` }
        { `getTokenSilently: ${getTokenSilently()}` }
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
    getByText(/user: {"name":"Test"}/);
    getByText(/loading: false/);
    getByText(/logout: undefined/);
    getByText(/loginWithRedirect: undefined/);
    getByText(/getTokenSilently: undefined/);
    getByText(/userHasRole: false/);
  });
});
