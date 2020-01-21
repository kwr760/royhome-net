import 'core-js';
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import App from './components/App';

loadableReady(() => {
  const root = document.getElementById('main');
  hydrate(
    <Router>
      <Route component={App} />
    </Router>,
    root,
  );
});
