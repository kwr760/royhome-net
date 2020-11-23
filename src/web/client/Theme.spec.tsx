import React from 'react';
import { Provider } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Store } from 'redux';

import createStore from './store/create-store';
import App from './App';
import { DarkModes } from './store/session/session.constants';
import Theme from './Theme';

jest.mock('./App');

describe('src/client/Theme', () => {
  const getApp = (store: Store, props: RouteComponentProps) => (
    <Provider store={store}>
      <Theme {...props} />
    </Provider>
  );
  const props = {} as unknown as RouteComponentProps;

  it('renders about page in light mode', () => {
    // Arrange
    const state = {
      session: {
        darkMode: DarkModes.CLEAR_MODE,
      },
    };
    const store = createStore(state);
    (App as jest.Mock).mockImplementation(() => <div>App</div>);

    // Act
    const { getByText } = render(getApp(store, props));

    // Assert
    getByText(/App/);
  });
  it('renders about page in dark mode', () => {
    // Arrange
    const state = {
      session: {
        darkMode: DarkModes.DARK_MODE,
      },
    };
    const store = createStore(state);
    (App as jest.Mock).mockImplementation(() => <div>App</div>);

    // Act
    const { getByText } = render(getApp(store, props));

    // Assert
    getByText(/App/);
  });
});
