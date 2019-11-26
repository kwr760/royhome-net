import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from './App';

describe('src/web/components/App', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    global.console.error = jest.fn();
    global.console.log = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    // Arrange
    fetch.mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    }));

    // Act
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
