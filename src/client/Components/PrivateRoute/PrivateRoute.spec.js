import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import { Auth0Context } from '../../../util/auth0/context';
import configureStore from '../../store/configure-store';

describe('client/Components/Pages/PrivateRoute', () => {
  const userRole = 'admin';
  const mockComponent = () => <div>Mocked</div>;
  const getPrivateRoute = (store, auth, role, path) => (
    <Router>
      <Provider store={store}>
        <Auth0Context.Provider value={auth}>
          <PrivateRoute component={mockComponent} userRole={role} path={path} />
        </Auth0Context.Provider>
      </Provider>
    </Router>
  );

  it('should render with authentication and role', () => {
    // Arrange
    const auth = {
      userHasRole: jest.fn(() => true),
    };
    const state = {
      session: {
        authenticated: true,
      },
    };
    const store = configureStore(state);

    // Act
    const { getByText } = render(getPrivateRoute(store, auth, userRole));

    // Assert
    getByText(/Mocked/);
  });
  it('should render error message without role', () => {
    // Arrange
    const auth = {
      isAuthenticated: true,
      userHasRole: jest.fn(() => false),
    };
    const state = {
      session: {
        authenticated: true,
      },
    };
    const store = configureStore(state);

    // Act
    const { getByText } = render(getPrivateRoute(store, auth, userRole));

    // Assert
    getByText(/admin/);
    getByText(/Unauthorized - You need the following role to view this page:/);
  });
  it('should login without authentication', async () => {
    // Arrange
    const path = 'http://url/path';
    const auth = {
      userHasRole: jest.fn(() => true),
      loginWithRedirect: jest.fn(),
    };
    const state = {
      session: {
        authenticated: false,
      },
    };
    const store = configureStore(state);

    // Act
    render(getPrivateRoute(store, auth, userRole, path));

    // Assert
    expect(auth.loginWithRedirect).toHaveBeenCalledWith({ appState: { targetUrl: 'http://url/path' } });
  });
  it('should render with authentication and without role', () => {
    // Arrange
    const auth = {
      userHasRole: jest.fn(() => true),
    };
    const state = {
      session: {
        authenticated: true,
      },
    };
    const store = configureStore(state);

    // Act
    const { getByText } = render(getPrivateRoute(store, auth));

    // Assert
    getByText(/Mocked/);
  });
});
