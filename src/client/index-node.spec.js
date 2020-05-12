import React from 'react';
import { render } from '@testing-library/react';

import Main from './index-node';
import configureStore from './store/configure-store';

jest.mock('../util/auth0/react-auth0-node', () => ({ children, onRedirectCallback }) => {
  onRedirectCallback();
  return children;
});
jest.mock('./App', () => () => (<div>App</div>));

describe('src/client/index-node', () => {
  it('launches the App', () => {
    // Arrange
    const url = '/';
    const context = {};
    const store = configureStore();

    // Act
    const { getByText } = render(<Main url={url} context={context} store={store} />);

    // Assert
    getByText(/App/);
  });
});
