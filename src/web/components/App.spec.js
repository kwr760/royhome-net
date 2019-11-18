import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from './App';

describe('src/web/components/App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders without crashing', () => {
    // Arrange
    console.log = jest.fn();

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
