import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './components/App';

const renderServerSide = () => {
  hydrate(
    <Router>
      <Route component={App} />
    </Router>,
    document.getElementById('root'),
  );
};

export default renderServerSide;
