import React from 'react';
import { render } from '@testing-library/react';

import Main from './index-node';

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

    // Act
    const { getByText } = render(<Main url={url} context={context} />);

    // Assert
    getByText(/App/);
  });
});
