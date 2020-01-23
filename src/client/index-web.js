/* eslint-disable no-underscore-dangle */
import 'core-js';
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import App from './components/App';

loadableReady(() => {
  const context = window.__INITIAL_DATA__;
  delete window.__INITIAL_DATA__;
  const root = document.getElementById('main');
  hydrate(
    <Router>
      <Route component={(props) => <App {...props} context={context} />} />
    </Router>,
    root,
  );
});
