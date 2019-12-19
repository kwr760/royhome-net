import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { render } from '@testing-library/react';

import App from './App';

jest.mock('axios', () => ({
  put: jest.fn().mockResolvedValue({}),
}));

describe('src/client/components/App', () => {
  beforeEach(() => {
    global.console.error = jest.fn();
    global.console.log = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    // Arrange/Act
    const history = createMemoryHistory();
    const { container } = render(
      <Router>
        <App history={history} />
      </Router>,
    );

    // Assert
    expect(container.innerHTML).toContain('This is the home page of Kevin Roy');
  });
});
