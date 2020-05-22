import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import PrivateRoute from './private-route';
import { Auth0Context } from '../../../util/auth0/auth0-context';
import hasNeededRole from '../../../util/auth0/has-needed-role';
import configureStore from '../../store/configure-store';

jest.mock('../../../util/auth0/has-needed-role');

describe('client/components/Pages/private-route', () => {
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
    const auth = {};
    const state = {
      session: {
        authenticated: true,
      },
    };
    const store = configureStore(state);
    hasNeededRole.mockReturnValue(true);

    // Act
    const { getByText } = render(getPrivateRoute(store, auth, userRole));

    // Assert
    getByText(/Mocked/);
  });
  it('should render error message without role', () => {
    // Arrange
    const auth = {
      isAuthenticated: true,
    };
    const state = {
      session: {
        authenticated: true,
      },
    };
    const store = configureStore(state);
    hasNeededRole.mockReturnValue(false);

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
      login: jest.fn(),
    };
    const state = {
      session: {
        authenticated: false,
      },
    };
    const store = configureStore(state);
    hasNeededRole.mockReturnValue(true);

    // Act
    render(getPrivateRoute(store, auth, userRole, path));

    // Assert
    expect(auth.login).toHaveBeenCalledWith({ appState: { targetUrl: 'http://url/path' } });
  });
  it('should render with authentication and without role', () => {
    // Arrange
    const auth = {};
    const state = {
      session: {
        authenticated: true,
      },
    };
    const store = configureStore(state);
    hasNeededRole.mockReturnValue(true);

    // Act
    const { getByText } = render(getPrivateRoute(store, auth));

    // Assert
    getByText(/Mocked/);
  });
});
