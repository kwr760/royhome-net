import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

import { Auth0Context } from '../util/auth0/auth0-context';
import App from './App';
import configureStore from './store/configure-store';

jest.mock('axios', () => ({
  put: jest.fn().mockResolvedValue({}),
}));
jest.mock('./components/page/loading', () => () => (<div>Loading</div>));
jest.mock('./components/page/nav-bar', () => () => (<div>NavBar</div>));
jest.mock('./components/page/footer', () => () => (<div>Footer</div>));
jest.mock('./components/resume', () => () => (<div>Resume</div>));
jest.mock('./components/about', () => () => (<div>About</div>));
jest.mock('./components/kevin', () => () => (<div>Kevin</div>));
jest.mock('./components/tictactoe', () => () => (<div>Tic Tac Toe</div>));

describe('src/client/App', () => {
  const history = createMemoryHistory();
  const context = {
    jwt: {},
  };
  const getApp = (store) => (
    <Provider store={store}>
      <Auth0Context.Provider value={{}}>
        <Router>
          <App history={history} context={context} />
        </Router>
      </Auth0Context.Provider>
    </Provider>
  );
  beforeEach(() => {
    global.console.error = jest.fn();
    global.console.log = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders about page', () => {
    // Arrange
    const state = {
      session: {
        isLoading: false,
      },
    };
    const store = configureStore(state);

    // Act
    const { getByText, queryByText } = render(getApp(store));

    // Assert
    getByText(/NavBar/);
    queryByText(/Index/);
    getByText(/Footer/);
    expect(queryByText('Loading')).toBeNull();
  });
  it('renders loading', () => {
    // Arrange
    const state = {
      session: {
        isLoading: true,
      },
    };
    const store = configureStore(state);

    // Act
    const { getByText, queryByText } = render(getApp(store));

    // Assert
    getByText(/Loading/);
    expect(queryByText('Home')).toBeNull();
  });
});
