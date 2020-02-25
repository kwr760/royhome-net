import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import { act } from 'react-dom/test-utils';
import createAuth0Client from '@auth0/auth0-spa-js';

import Auth0Provider from './react-auth0-spa';
import { useAuth0 } from './context';

jest.mock('@auth0/auth0-spa-js');

describe('util/auth0/react-auth0-spa', () => {
  const testContext = {
    jwt: {
      expiresAt: 0,
      user: {},
      data: {},
    },
  };
  const testProvider = (context, config) => (
    <Auth0Provider
      domain="domain"
      client_id="clientId"
      audience="audience"
      redirect_uri="/origin"
      context={context}
    >
      <TestConsumer config={config} />
    </Auth0Provider>
  );

  // eslint-disable-next-line react/prop-types
  const TestConsumer = ({ config = {} }) => {
    const performCoverage = (config.coverage) ? config.coverage : false;

    const {
      isAuthenticated,
      user,
      loading,
      popupOpen,
      loginWithRedirect,
      getTokenSilently,
      getTokenWithPopup,
      getIdTokenClaims,
      userHasRole,
      loginWithPopup,
      logout,
      handleRedirectCallback,
    } = useAuth0();

    if (performCoverage) {
      loginWithRedirect();
      getTokenSilently();
      getIdTokenClaims();
      getTokenWithPopup();
    }

    return (
      <div>
        { `isAuthenticated: ${isAuthenticated}` }
        { `user: ${JSON.stringify(user)}` }
        { `loading: ${loading}` }
        { `popupOpen: ${popupOpen}` }
        { `userHasRole: ${userHasRole('friend')}` }
        <button type="button" onClick={logout}>
          Logout
        </button>
        <button type="button" onClick={loginWithPopup}>
          LoginWithPopup
        </button>
        <button type="button" onClick={() => loginWithPopup(undefined)}>
          LoginPopupUndefined
        </button>
        <button type="button" onClick={handleRedirectCallback}>
          HandleRedirectCallback
        </button>
      </div>
    );
  };
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should populate an unauthenticated provider coverage of empty functions', async () => {
    // Arrange
    createAuth0Client.mockResolvedValue({
      loginWithRedirect: jest.fn(() => ({})),
      getTokenSilently: jest.fn(() => ({})),
      getIdTokenClaims: jest.fn(() => ({})),
      getTokenWithPopup: jest.fn(() => ({})),
      isAuthenticated: jest.fn(() => false),
    });

    // Act
    const { getByText } = render(testProvider(testContext, { coverage: true }));
    await wait();

    // Assert
    getByText(/isAuthenticated: false/);
    getByText(/user: {}/);
  });
  it('should populate an authenticated provider', async () => {
    // Arrange
    createAuth0Client.mockResolvedValue({
      isAuthenticated: jest.fn(() => true),
      getUser: jest.fn(() => ({ name: 'Tester' })),
      getIdTokenClaims: jest.fn(() => ({ exp: 999999999, 'http:\\royhome.net': { data: 'test data' } })),
    });

    // Act
    const { getByText } = render(testProvider(testContext));
    await wait();

    // Assert
    getByText(/isAuthenticated: true/);
    getByText(/user: {"name":"Tester"}/);
  });
  it('should login with popup', async () => {
    // Arrange
    createAuth0Client.mockResolvedValue({
      isAuthenticated: jest.fn(() => false),
      getUser: jest.fn(() => ({ name: 'Tester' })),
      getIdTokenClaims: jest.fn(() => ({ exp: 999999999, 'http://royhome.net': { data: 'test data' } })),
      loginWithPopup: jest.fn(() => ({})),
    });

    // Act
    const { getByText } = render(testProvider(testContext));
    await wait();
    fireEvent.click(getByText(/LoginWithPopup/));
    fireEvent.click(getByText(/LoginPopupUndefined/));
    await wait();

    // Assert
    getByText(/isAuthenticated: true/);
    getByText(/user: {"name":"Tester"}/);
  });
  it('should login with popup with exception', async () => {
    // Arrange
    jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    createAuth0Client.mockResolvedValue({
      isAuthenticated: jest.fn(() => false),
      getUser: jest.fn(() => ({ name: 'Tester' })),
      getIdTokenClaims: jest.fn(() => ({ exp: 999999999, 'http://royhome.net': { data: 'test data' } })),
      loginWithPopup: jest.fn(() => { throw new Error('Login Error'); }),
    });

    // Act
    const { getByText } = render(testProvider(testContext));
    await wait();
    fireEvent.click(getByText(/LoginWithPopup/));
    await wait();

    // Assert
    getByText(/isAuthenticated: true/);
    getByText(/user: {"name":"Tester"}/);
    expect(console.error).toHaveBeenCalled();
  });
  it('should logout an authenticated provider', async () => {
    // Arrange
    createAuth0Client.mockResolvedValue({
      isAuthenticated: jest.fn(() => true),
      getUser: jest.fn(() => ({ name: 'Tester' })),
      getIdTokenClaims: jest.fn(() => ({ exp: 999999999, 'http:\\royhome.net': { data: 'test data' } })),
      logout: jest.fn(() => ({})),
    });

    // Act
    const { getByText } = render(testProvider(testContext));
    await wait();
    fireEvent.click(getByText(/Logout/));
    await wait();

    // Assert
    getByText(/isAuthenticated: false/);
    getByText(/user: {}/);
  });
  it('should login with handle redirect callback', async () => {
    // Arrange
    createAuth0Client.mockResolvedValue({
      isAuthenticated: jest.fn(() => false),
      handleRedirectCallback: jest.fn(() => ({})),
      getUser: jest.fn(() => ({ name: 'Tester' })),
    });

    // Act
    const { getByText } = render(testProvider(testContext));
    await wait();
    fireEvent.click(getByText(/HandleRedirectCallback/));
    await wait();

    // Assert
    getByText(/isAuthenticated: true/);
    getByText(/user: {"name":"Tester"}/);
  });
  it('should handle redirect callback', async () => {
    // Arrange
    const savedWindow = global.window;
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        pathname: 'code=',
        search: {
          includes: () => true,
        },
      },
    });
    // document.title = 'Title';
    createAuth0Client.mockResolvedValue({
      loginWithRedirect: jest.fn(() => ({})),
      getTokenSilently: jest.fn(() => ({})),
      getIdTokenClaims: jest.fn(() => ({})),
      getTokenWithPopup: jest.fn(() => ({})),
      isAuthenticated: jest.fn(() => false),
      handleRedirectCallback: jest.fn(() => ({ test: 'kroy' })),
    });

    // Act
    const { getByText } = render(testProvider(testContext, { coverage: true }));
    await wait();

    // Assert
    getByText(/isAuthenticated: false/);
    getByText(/user: {}/);
    global.window = savedWindow;
  });
});
