import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, RouteComponentProps } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Store } from 'redux';

import { Auth0Context } from '../util/auth0/auth0-context';
import App from './App';
import Loading from './components/page/loading';
import NavBar from './components/page/nav-bar';
import Footer from './components/page/footer';
import Resume from './components/resume';
import About from './components/about';
import Author from './components/author';
import TicTacToe from './components/tictactoe';
import createStore from './store/create-store';

jest.mock('@loadable/component');
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
  const getApp = (store: Store, props: RouteComponentProps) => (
    <Provider store={store}>
      <Auth0Context.Provider value={{
        login: () => {},
        logout: () => {},
        getToken: () => {},
      }}>
        <Router>
          <App {...props} />
        </Router>
      </Auth0Context.Provider>
    </Provider>
  );
  const props = {} as unknown as RouteComponentProps;
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
    const store = createStore(state);
    // (loadable as jest.Mock).mockImplementation((page) => () => {
    //   page();
    // });
    (Loading as jest.Mock).mockImplementation(() => <div>Loading</div>);
    (NavBar as jest.Mock).mockImplementation(() => <div>NavBar</div>);
    (Footer as jest.Mock).mockImplementation(() => <div>Footer</div>);
    (Resume as jest.Mock).mockImplementation(() => <div>Resume</div>);
    (About as jest.Mock).mockImplementation(() => <div>About</div>);
    (Author as jest.Mock).mockImplementation(() => <div>Author</div>);
    (TicTacToe as jest.Mock).mockImplementation(() => <div>Tic Tac Toe</div>);

    // Act
    const { container, getByText, queryByText } = render(getApp(store, props));

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
    const store = createStore(state);

    // Act
    const { getByText, queryByText } = render(getApp(store, props));

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
    const store = createStore(state);

    // Act
    const { container } = render(getApp(store, props));

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
    const store = createStore(state);

    // Act
    const { container } = render(getApp(store, props));

    // Assert
    expect((container.firstChild as HTMLElement).classList.contains('light-theme')).toBe(true);
  });
});
