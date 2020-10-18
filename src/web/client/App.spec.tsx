import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

import { Auth0Context } from '../util/auth0/auth0-context';
import App from './App';
import Loading from './components/page/loading';
import NavBar from './components/page/nav-bar';
import Footer from './components/page/footer';
import Resume from './components/resume';
import About from './components/about';
import Author from './components/author';
import TicTacToe from './components/tictactoe';
import configureStore from './store/configure-store';

jest.mock('axios', () => ({
  put: jest.fn().mockResolvedValue({}),
}));
jest.mock('./components/page/loading');
jest.mock('./components/page/nav-bar');
jest.mock('./components/page/footer');
jest.mock('./components/resume');
jest.mock('./components/about');
jest.mock('./components/author');
jest.mock('./components/tictactoe');

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
    (Loading as jest.Mock).mockImplementation(() => <div>Loading</div>);
    (NavBar as jest.Mock).mockImplementation(() => <div>NavBar</div>);
    (Footer as jest.Mock).mockImplementation(() => <div>Footer</div>);
    (Resume as jest.Mock).mockImplementation(() => <div>Resume</div>);
    (About as jest.Mock).mockImplementation(() => <div>About</div>);
    (Author as jest.Mock).mockImplementation(() => <div>Author</div>);
    (TicTacToe as jest.Mock).mockImplementation(() => <div>Tic Tac Toe</div>);

    // Act
    const { container, getByText, queryByText } = render(getApp(store));

    // Assert
    getByText(/NavBar/);
    queryByText(/Index/);
    getByText(/Footer/);
    expect(queryByText('Loading')).toBeNull();
    expect((container.firstChild as HTMLElement).classList.contains('dark-theme')).toBe(false);
    expect((container.firstChild as HTMLElement).classList.contains('light-theme')).toBe(false);
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
  it('renders in dark mode', () => {
    // Arrange
    const state = {
      session: {
        darkMode: 'dark-mode',
      },
    };
    const store = configureStore(state);

    // Act
    const { container } = render(getApp(store));

    // Assert
    expect((container.firstChild as HTMLElement).classList.contains('dark-theme')).toBe(true);
  });
  it('renders in light mode', () => {
    // Arrange
    const state = {
      session: {
        darkMode: 'light-mode',
      },
    };
    const store = configureStore(state);

    // Act
    const { container } = render(getApp(store));

    // Assert
    expect((container.firstChild as HTMLElement).classList.contains('light-theme')).toBe(true);
  });
});
