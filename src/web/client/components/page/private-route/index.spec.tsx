import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Auth0Context } from '../../../../util/auth0/auth0-context';
import hasNeededRole from '../../../../../common/util/auth0/has-needed-role';
import PrivateRoute from './index';
import createStore from '../../../store/create-store';

jest.mock('../../../../../common/util/auth0/has-needed-role');

describe('client/components/page/private-route', () => {
  const userRole = 'admin';
  const mockComponent = () => <div>Mocked</div>;
  const getPrivateRoute = (store, auth, role, path = '/') => (
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
    const store = createStore(state);
    (hasNeededRole as jest.Mock).mockReturnValue(true);

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
    const store = createStore(state);
    (hasNeededRole as jest.Mock).mockReturnValue(false);

    // Act
    const { getByText } = render(getPrivateRoute(store, auth, userRole));

    // Assert
    getByText(/admin/);
    getByText(/Unauthorized - You need the following role to view this page:/);
  });
  it('should render with authentication and without role', () => {
    // Arrange
    const auth = {};
    const state = {
      session: {
        authenticated: true,
      },
    };
    const role = undefined;
    const store = createStore(state);
    (hasNeededRole as jest.Mock).mockReturnValue(true);

    // Act
    const { getByText } = render(getPrivateRoute(store, auth, role));

    // Assert
    getByText(/Mocked/);
  });
});
