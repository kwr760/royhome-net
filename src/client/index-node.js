import React from 'react';
import { StaticRouter as Router, Route } from 'react-router-dom';

import PropTypes from 'prop-types';

import Auth0Provider from '../util/auth0/react-auth0-node';
import config from '../util/auth0/auth_config.json';
import App from './components/App';

const onRedirectCallback = () => {};

const Main = ({ url, context }) => (
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    onRedirectCallback={onRedirectCallback}
    context={context}
  >
    <Router location={url}>
      <Route component={(props) => <App {...props} context={context} />} />
    </Router>
  </Auth0Provider>
);

Main.propTypes = {
  url: PropTypes.string.isRequired,
  context: PropTypes.shape().isRequired,
};

export default Main;
