import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import NavBar from './NavBar';
import { Auth0Context } from '../../../util/auth0/context';
import initFontAwesome from '../../util/init-font-awesome';
import configureStore from '../../store/configure-store';

initFontAwesome();

describe('client/Components/Pages/NavBar', () => {
  const getNavBar = (store, auth) => (
    <Provider store={store}>
      <Auth0Context.Provider value={auth}>
        <Router>
          <NavBar />
        </Router>
      </Auth0Context.Provider>
    </Provider>
  );
  it('should render with authentication and role', () => {
    // Arrange
    const auth = {
      logout: jest.fn(),
      userHasRole: jest.fn(() => true),
    };
    const state = {
      session: {
        authenticated: true,
      },
    };
    const store = configureStore(state);

    // Act
    const { getByText, getAllByText, getByTestId } = render(getNavBar(store, auth));

    // Assert
    getByText(/Home/);
    getByText(/Resume/);
    getByText(/Courses/);
    getAllByText(/Log out/);

    fireEvent.click(getByTestId('navbar-toggler'));
  });
  it('should render with authentication and user', () => {
    // Arrange
    const auth = {
      logout: jest.fn(),
      userHasRole: jest.fn(() => false),
    };
    const state = {
      session: {
        authenticated: true,
      },
      user: {
        name: 'Tester',
        picture: 'pic',
      },
    };
    const store = configureStore(state);

    // Act
    const {
      getByText, getAllByText, getAllByAltText, getByTestId,
    } = render(getNavBar(store, auth));

    // Assert
    getByText(/Home/);
    getByText(/Resume/);
    getAllByText(/Tester/);
    getAllByAltText(/Profile/);
    getAllByText(/Log out/);

    fireEvent.click(getByTestId('navbar-toggler'));

    fireEvent.click(getAllByText(/Log out/)[0]);
    fireEvent.click(getAllByText(/Log out/)[1]);
    expect(auth.logout).toHaveBeenCalledTimes(2);
  });
  it('should render without authentication and role', () => {
    // Arrange
    const auth = {
      loginWithRedirect: jest.fn(),
      logout: jest.fn(),
      userHasRole: jest.fn(() => false),
    };
    const state = {
      session: {
        authenticated: false,
      },
    };
    const store = configureStore(state);

    // Act
    const { getByText, getAllByText } = render(getNavBar(store, auth));

    // Assert
    getByText(/Home/);
    getByText(/Resume/);
    getAllByText(/Log in/);

    fireEvent.click(getAllByText(/Log in/)[0]);
    fireEvent.click(getAllByText(/Log in/)[1]);
    expect(auth.loginWithRedirect).toHaveBeenCalledTimes(2);
  });
});
