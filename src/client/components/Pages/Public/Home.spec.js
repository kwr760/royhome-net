import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import Home from './Home';
import Context from '../../Context';

jest.mock('../../Auth/Auth');

describe('client/components/Pages/Public/Home', () => {
  it('should render an unauthenticated page', () => {
    // Arrange
    const auth = {
      handleAuthentication: jest.fn(),
      isAuthenticated: jest.fn(() => false),
      login: jest.fn(),
    };
    const location = {
      hash: 'http://url/',
    };

    // Act
    const { getByText } = render(
      <Context.Provider value={auth}>
        <Home location={location} />
      </Context.Provider>,
    );

    // Assert
    getByText('Login');
    expect(auth.handleAuthentication).not.toBeCalled();
  });

  it('should render an authenticated page', () => {
    // Arrange
    const auth = {
      isAuthenticated: jest.fn(() => true),
      login: jest.fn(),
      handleAuthentication: jest.fn(),
    };
    const location = {
      hash: 'http://url/',
    };

    // Act
    const { getByText } = render(
      <Router>
        <Context.Provider value={auth}>
          <Home location={location} />
        </Context.Provider>
      </Router>,
    );

    // Assert
    getByText('View profile');
    expect(auth.handleAuthentication).not.toBeCalled();
  });
  it('should call handleAuthentication on good url hash', () => {
    // Arrange
    const auth = {
      handleAuthentication: jest.fn(),
      isAuthenticated: jest.fn(() => true),
      login: jest.fn(),
    };
    const location = {
      hash: 'http://url/access_token',
    };

    // Act
    const { getByText } = render(
      <Router>
        <Context.Provider value={auth}>
          <Home location={location} />
        </Context.Provider>
      </Router>,
    );

    getByText('This is the home page of Kevin Roy');
    expect(auth.handleAuthentication).toBeCalled();
  });
});
