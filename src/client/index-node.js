import React from 'react';
import { StaticRouter as Router, Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import App from './components/App';

const Main = ({ url, context }) => (
  <Router location={url}>
    <Route component={(props) => <App {...props} context={context} />} />
  </Router>
);

Main.propTypes = {
  url: PropTypes.string.isRequired,
  context: PropTypes.shape().isRequired,
};

export default Main;
