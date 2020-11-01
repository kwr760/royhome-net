import React from 'react';
import { render } from '@testing-library/react';
import thunk from 'redux-thunk';

import Main from './index-node';
import configureMockStore from 'redux-mock-store';
import App from './App';

jest.mock('./App');

describe('src/client/index-node', () => {
  const mockStore = configureMockStore([thunk]);
  it('launches the App', () => {
    // Arrange
    const url = '/';
    const state = {
      session: {
        isLoading: true,
      },
      resume: {
        resumes: {},
      },
    };
    const store = mockStore(state);
    (App as jest.Mock).mockImplementation(() => { return <div>App</div>; });

    // Act
    const { getByText } = render(<Main url={url} store={store} />);

    // Assert
    getByText(/App/);
  });
});
