import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import configureStore from '../../../store/configure-store';
import NavToggler from './nav-toggler';
import NavTogglerMenu from './nav-toggler-menu';
import NavTogglerButton from './nav-toggler-button';

jest.mock('./nav-toggler-button');
jest.mock('./nav-toggler-menu');

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
    (NavTogglerMenu as jest.Mock).mockImplementation(() => <div>Nav Toggler Menu</div>);

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
    (NavTogglerButton as jest.Mock).mockImplementation(() => <div>Nav Toggler Button</div>);

    // Act
    const { getByText } = render(getComponent(store));

    // Assert
    getByText(/Nav Toggler Button/);
  });
});
