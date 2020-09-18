import React from 'react';
import { useDispatch } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import createAuth0Client from '@auth0/auth0-spa-js';

import Auth0Provider from './auth0-spa';
import { useAuth0 } from './auth0-context';

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
      login,
      getToken,
      logout,
    } = useAuth0();

    if (performCoverage) {
      login();
      getToken();
    }

    return (
      <div>
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
    const expectedLoadingOn = { payload: { isLoading: true }, type: 'UPDATE_LOADING' };
    const expectedLoadingOff = { payload: { isLoading: false }, type: 'UPDATE_LOADING' };
    const expectedAuthOn = { payload: { authenticated: true, expiration: 999999999 }, type: 'UPDATE_AUTHENTICATION' };
    const expectedAuthOff = { payload: { authenticated: false, expiration: 0 }, type: 'UPDATE_AUTHENTICATION' };
    const expectedUserOn = { payload: { user: { name: 'Tester' } }, type: 'UPDATE_USER' };
    const expectedUserOff = { payload: { user: { } }, type: 'UPDATE_USER' };

    // Act
    const { getByText } = render(testProvider(testContext));
    await waitFor(() => {});
    fireEvent.click(getByText(/Logout/));
    await waitFor(() => {});

    // Assert
    expect(dispatch).toBeCalledTimes(6);
    expect(dispatch).toHaveBeenNthCalledWith(1, expectedLoadingOn);
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedAuthOn);
    expect(dispatch).toHaveBeenNthCalledWith(3, expectedUserOn);
    expect(dispatch).toHaveBeenNthCalledWith(4, expectedLoadingOff);
    expect(dispatch).toHaveBeenNthCalledWith(5, expectedAuthOff);
    expect(dispatch).toHaveBeenNthCalledWith(6, expectedUserOff);
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
    createAuth0Client.mockResolvedValue({
      isAuthenticated: jest.fn(() => false),
      loginWithRedirect: jest.fn(() => ({})),
      getTokenSilently: jest.fn(() => ({})),
      handleRedirectCallback: jest.fn(() => ({ test: 'kroy' })),
    });
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const expectedLoadingOn = { payload: { isLoading: true }, type: 'UPDATE_LOADING' };
    const expectedLoadingOff = { payload: { isLoading: false }, type: 'UPDATE_LOADING' };
    const expectedAuthOff = { payload: { authenticated: false, expiration: 0 }, type: 'UPDATE_AUTHENTICATION' };
    const expectedUserOff = { payload: { user: { } }, type: 'UPDATE_USER' };

    // Act
    render(testProvider(testContext, { coverage: true }));
    await waitFor(() => {});

    // Assert
    expect(dispatch).toBeCalledTimes(4);
    expect(dispatch).toHaveBeenNthCalledWith(1, expectedLoadingOn);
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedAuthOff);
    expect(dispatch).toHaveBeenNthCalledWith(3, expectedUserOff);
    expect(dispatch).toHaveBeenNthCalledWith(4, expectedLoadingOff);
    global.window = savedWindow;
  });
});
