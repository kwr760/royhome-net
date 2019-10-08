import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from './App';

it('renders without crashing', () => {
  const history = createMemoryHistory();
  const { container } = render(
    <Router>
      <App history={history} />
    </Router>
  );

  expect(container.innerHTML).toMatch('You are home');
});
