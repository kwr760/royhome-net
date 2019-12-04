import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import App from './components/App';

const renderClientSide = () => {
  render(
    <Router>
      <Route component={App} />
    </Router>,
    document.getElementById('root'),
  );
};

export default renderClientSide;
