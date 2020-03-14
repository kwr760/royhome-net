// @flow

/* eslint-disable no-underscore-dangle */
import 'core-js';
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss';

import Auth0Provider from '../util/auth0/react-auth0-spa';
import config from '../util/auth0/auth_config.json';
import App from './App';
import history from '../util/history';

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
};

loadableReady(() => {
  const context = window.__INITIAL_DATA__;
  delete window.__INITIAL_DATA__;
  const root = document.getElementById('main');
  if (root !== null) {
    hydrate(
      <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        audience={config.audience}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
        context={context}
      >
        <Router>
          <Route component={(props) => <App {...props} context={context} />} />
        </Router>
      </Auth0Provider>,
      root,
    );
  }
});
