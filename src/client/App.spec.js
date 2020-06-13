import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store/configure-store';

jest.mock('axios', () => ({
  put: jest.fn().mockResolvedValue({}),
}));
jest.mock('./components/page/loading/loading', () => () => (<div>Loading</div>));
jest.mock('./components/page/nav-bar/nav-bar', () => () => (<div>NavBar</div>));
jest.mock('./components/page/footer/footer', () => () => (<div>Footer</div>));
jest.mock('./components/home/home', () => () => (<div>Home</div>));

describe('src/client/App', () => {
  const history = createMemoryHistory();
  const context = {
    jwt: {},
  };
  const getApp = (store) => (
    <Provider store={store}>
      <Router>
        <App history={history} context={context} />
      </Router>
    </Provider>
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
    queryByText(/Home/);
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
