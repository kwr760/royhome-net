import React from 'react';
import { render } from 'react-dom';
import './index.css';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App';

render(
  <Router>
    <Route component={App} />
  </Router>,
  document.getElementById('root')
);
