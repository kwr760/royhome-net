import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Store } from 'redux';
import NavTabItem from './nav-tab-item';
import createStore from '../../../store/create-store';

describe('client/components/page/nav-bar/nav-tab-item', () => {
  const getComponent = (store: Store, path: string, name: string, role?: string) => (
    <Provider store={store}>
      <Router>
        <NavTabItem path={path} name={name} neededRole={role} />
      </Router>
    </Provider>
  );
  it('should render the nav item', () => {
    // Arrange
    const state = {
      session: {
        authenticated: true,
      },
      user: {
        name: 'Tester',
        context: {
          role: 'engineer',
        },
      },
    };
    const store = createStore(state);

    // Act
    const { getByText, getByRole } = render(getComponent(store, '/path', 'Name', 'engineer'));

    // Assert
    getByText(/Name/);
    const link = getByRole('link') as unknown as Location;
    expect(link.pathname).toBe('/path');
  });
  it('should not render the nav item without role', () => {
    // Arrange
    const state = {
      session: {
        authenticated: true,
      },
    };
    const store = createStore(state);

    // Act
    const { container } = render(getComponent(store, '/path', 'Name', 'engineer'));

    // Assert
    expect(container).toBeEmptyDOMElement();
  });
  it('should not render the nav item no needed role', () => {
    // Arrange
    const state = {
      session: {
        authenticated: true,
      },
    };
    const store = createStore(state);

    // Act
    const { getByText } = render(getComponent(store, '/path', 'Name'));

    // Assert
    getByText(/Name/);
  });
});
