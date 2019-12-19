import 'core-js';
import React from 'react';
import { hydrate } from 'react-dom';

import { HashRouter as Router, Route } from 'react-router-dom';

// eslint-disable-next-line import/no-extraneous-dependencies
import { loadableReady } from '@loadable/component';

import App from './components/App';

import './components/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

loadableReady(() => {
  const root = document.getElementById('main');
  hydrate(
    <Router>
      <Route component={App} />
    </Router>,
    root,
  );
});
