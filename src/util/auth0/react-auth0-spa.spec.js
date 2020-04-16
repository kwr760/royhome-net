import React from 'react';
import { useDispatch } from 'react-redux';
import { render, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import createAuth0Client from '@auth0/auth0-spa-js';

import Auth0Provider from './react-auth0-spa';
import { useAuth0 } from './context';

jest.mock('@auth0/auth0-spa-js');
jest.mock('react-redux');

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
      user,
      loading,
      loginWithRedirect,
      getTokenSilently,
      userHasRole,
      logout,
    } = useAuth0();

    if (performCoverage) {
      loginWithRedirect();
      getTokenSilently();
    }

    return (
      <div>
        { `user: ${JSON.stringify(user)}` }
        { `loading: ${loading}` }
        { `userHasRole: ${userHasRole('friend')}` }
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
    );
  };
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should logout an authenticated provider', async () => {
    // Arrange
    createAuth0Client.mockResolvedValue({
      isAuthenticated: jest.fn(() => true),
      getUser: jest.fn(() => ({ name: 'Tester' })),
      logout: jest.fn(() => ({})),
      getIdTokenClaims: jest.fn(() => ({ exp: 999999999, 'http:\\royhome.net': { data: 'test data' } })),
    });
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    // Act
    const { getByText } = render(testProvider(testContext));
    await wait();
    fireEvent.click(getByText(/Logout/));
    await wait();

    // Assert
    getByText(/user: {}/);
    expect(dispatch).toBeCalledTimes(2);
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
      isAuthenticated: jest.fn(() => false),
      loginWithRedirect: jest.fn(() => ({})),
      getTokenSilently: jest.fn(() => ({})),
      handleRedirectCallback: jest.fn(() => ({ test: 'kroy' })),
    });
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    // Act
    const { getByText } = render(testProvider(testContext, { coverage: true }));
    await wait();

    // Assert
    getByText(/user: {}/);
    expect(dispatch).toBeCalledTimes(1);
    global.window = savedWindow;
  });
});
