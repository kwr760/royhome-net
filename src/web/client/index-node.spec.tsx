import React from 'react';
import { render } from '@testing-library/react';

import Main from './index-node';
import configureStore from './store/configure-store';
import App from './App';

jest.mock('../util/auth0/auth0-node', () => ({ children }) => children);
jest.mock('./App');

describe('src/client/index-node', () => {
  it('launches the App', () => {
    // Arrange
    const url = '/';
    const store = configureStore();
    (App as jest.Mock).mockImplementation(() => <div>App</div>);

    // Act
    const { getByText } = render(<Main url={url} store={store} />);

    // Assert
    getByText(/App/);
  });
});
