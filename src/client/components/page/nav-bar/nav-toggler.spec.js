import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import initFontAwesome from '../../../util/init-font-awesome';
import configureStore from '../../../store/configure-store';
import NavToggler from './nav-toggler';

initFontAwesome();

jest.mock('./nav-toggler-button', () => () => (<div>Nav Toggler Button</div>));
jest.mock('./nav-toggler-menu', () => () => (<div>Nav Toggler Menu</div>));

describe('client/components/page/nav-bar/nav-toggler', () => {
  const getComponent = (store) => (
    <Provider store={store}>
      <Router>
        <NavToggler />
      </Router>
    </Provider>
  );
  it('should render menu', () => {
    // Arrange
    const state = {
      session: {
        authenticated: true,
      },
    };
    const store = configureStore(state);

    // Act
    const { getByText } = render(getComponent(store));

    // Assert
    getByText(/Nav Toggler Menu/);
  });
  it('should render button', () => {
    // Arrange
    const state = {
      session: {
        authenticated: false,
      },
    };
    const store = configureStore(state);

    // Act
    const { getByText } = render(getComponent(store));

    // Assert
    getByText(/Nav Toggler Button/);
  });
});
