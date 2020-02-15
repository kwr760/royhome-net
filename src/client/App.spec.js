import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { render } from '@testing-library/react';

import { Auth0Context } from '../util/auth0/context';
import App from './App';

jest.mock('axios', () => ({
  put: jest.fn().mockResolvedValue({}),
}));

describe('src/client/Components/App', () => {
  beforeEach(() => {
    global.console.error = jest.fn();
    global.console.log = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders home page', () => {
    // Arrange/Act
    const history = createMemoryHistory();
    const context = {
      jwt: {},
    };
    const auth = {
      loading: false,
    };

    const { container } = render(
      <Auth0Context.Provider value={auth}>
        <Router>
          <App history={history} context={context} />
        </Router>
      </Auth0Context.Provider>,
    );

    // Assert
    expect(container.innerHTML).toContain('This is the home page of Kevin Roy');
  });

  it('renders Loading', () => {
    // Arrange/Act
    const history = createMemoryHistory();
    const context = {
      jwt: {},
    };
    const auth = {
      loading: true,
    };

    const { getByAltText } = render(
      <Auth0Context.Provider value={auth}>
        <Router>
          <App history={history} context={context} />
        </Router>
      </Auth0Context.Provider>,
    );

    // Assert
    getByAltText(/Loading/);
  });
});
