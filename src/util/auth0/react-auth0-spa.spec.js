import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import createAuth0Client from '@auth0/auth0-spa-js';

import Auth0Provider from './react-auth0-spa';
import { useAuth0 } from './context';

jest.mock('@auth0/auth0-spa-js');

describe('util/auth0/react-auth0-spa', () => {
  const TestConsumer = () => {
    const {
      isAuthenticated,
      // user,
      // loading,
      // popupOpen,
      // loginWithPopup,
      // handleRedirectCallback,
      // getIdTokenClaims,
      // loginWithRedirect,
      // getTokenSilently,
      // getTokenWithPopup,
      // logout,
      // userHasRole,
    } = useAuth0();
    return (
      <div>
        { `isAuthenticated: ${isAuthenticated}` }
        {/*{ `user: ${JSON.stringify(user)}` }*/}
        {/*{ `loading: ${loading}` }*/}
        {/*{ `popupOpen: ${popupOpen}` }*/}
        {/*{ `userHasRole: ${userHasRole('friend')}` }*/}
        {/*{ `loginWithPopup: ${loginWithPopup()}` }*/}
        {/*{ `handleRedirectCallback: ${handleRedirectCallback()}` }*/}
        {/*{ `getIdTokenClaims: ${getIdTokenClaims()}` }*/}
        {/*{ `loginWithRedirect: ${loginWithRedirect()}` }*/}
        {/*{ `getTokenSilently: ${getTokenSilently()}` }*/}
        {/*{ `getTokenWithPopup: ${getTokenWithPopup()}` }*/}
        {/*{ `logout: ${logout()}` }*/}
      </div>
    );
  };
  beforeEach(() => {
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should populate a Provider', () => {
    // Arrange
    createAuth0Client.mockResolvedValue({
      handleRedirectCallback: jest.fn(),
      isAuthenticated: jest.fn(() => false),
      getUser: jest.fn(() => ({ name: 'Tester' })),
      getIdTokenClaims: jest.fn(() => ({})),
    });
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

    act(() => {
      const provider = (
        <Auth0Provider context={context}>
          <TestConsumer />
        </Auth0Provider>
      );
      // Act
      const { getByText } = render(provider);

      // Assert
      getByText(/isAuthenticated: true/);
      // getByText(/user: {"name":"Test"}/);
      // getByText(/loading: false/);
      // getByText(/popupOpen: false/);
      // getByText(/userHasRole: false/);
      // getByText(/loginWithPopup: undefined/);
      // getByText(/handleRedirectCallback: undefined/);
      // getByText(/getIdTokenClaims: undefined/);
      // getByText(/loginWithRedirect: undefined/);
      // getByText(/getTokenSilently: undefined/);
      // getByText(/getTokenWithPopup: undefined/);
      // getByText(/logout: undefined/);
    });
  });
});
