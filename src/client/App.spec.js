import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

import { Auth0Context } from '../util/auth0/context';
import App from './App';

jest.mock('axios', () => ({
  put: jest.fn().mockResolvedValue({}),
}));
jest.mock('./Components/Loading/Loading', () => () => (<div>Loading</div>));
jest.mock('./Components/NavBar/NavBar', () => () => (<div>NavBar</div>));
jest.mock('./Components/Footer/Footer', () => () => (<div>Footer</div>));
jest.mock('./Pages/Home/Home', () => () => (<div>Home</div>));

describe('src/client/App', () => {
  const history = createMemoryHistory();
  const context = {
    jwt: {},
  };
  const getApp = (auth) => (
    <Auth0Context.Provider value={auth}>
      <Router>
        <App history={history} context={context} />
      </Router>
    </Auth0Context.Provider>
  );
  beforeEach(() => {
    global.console.error = jest.fn();
    global.console.log = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders home page', () => {
    // Arrange
    const auth = {
      loading: false,
    };

    // Act
    const { getByText, queryByText } = render(getApp(auth));

    // Assert
    getByText(/NavBar/);
    queryByText(/Home/);
    getByText(/Footer/);
    expect(queryByText('Loading')).toBeNull();
  });
  it('renders Loading', () => {
    // Arrange
    const auth = {
      loading: true,
    };

    // Act
    const { getByText, queryByText } = render(getApp(auth));

    // Assert
    getByText(/Loading/);
    expect(queryByText('Home')).toBeNull();
  });
});
