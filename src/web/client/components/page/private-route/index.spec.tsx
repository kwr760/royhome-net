import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Auth0ContextType } from '../../../../types/auth0.types';
import { Auth0Context } from '../../../../util/auth0/auth0-context';
import hasNeededRole from '../../../../../common/util/auth0/has-needed-role';
import PrivateRoute from './index';
import createStore from '../../../store/create-store';

jest.mock('../../../../../common/util/auth0/has-needed-role');

describe('client/components/page/private-route', () => {
  const userRole = 'admin';
  const mockComponent = () => <div>Mocked</div>;
  const getPrivateRoute = (store: Store, auth: Auth0ContextType, role?: string, path = '/') => (
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
    const auth = {} as unknown as Auth0ContextType;
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
    } as unknown as Auth0ContextType;
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
    const auth = {} as unknown as Auth0ContextType;
    const state = {
      session: {
        authenticated: true,
      },
    };
    const store = createStore(state);
    (hasNeededRole as jest.Mock).mockReturnValue(true);

    // Act
    const { getByText } = render(getPrivateRoute(store, auth));

    // Assert
    getByText(/Mocked/);
  });
});
