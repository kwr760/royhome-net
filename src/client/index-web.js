// @flow

/* eslint-disable no-underscore-dangle */
import 'core-js';
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss';

import history from '@src/util/history';
import Auth0Provider from '@src/util/auth0/auth0-spa';
import { config } from '@src/util/auth0/auth0.constants';
import App from './App';
import configureStore from './store/configure-store';

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
};

loadableReady(() => {
  const root = document.getElementById('main');
  if (root !== null) {
    const preloadedState = window.__PRELOADED_STATE__;
    delete window.__PRELOADED_STATE__;
    const store = configureStore(preloadedState);
    hydrate(
      <Provider store={store}>
        <Auth0Provider
          domain={config.domain}
          client_id={config.clientId}
          audience={config.audience}
          redirect_uri={window.location.origin}
          onRedirectCallback={onRedirectCallback}
        >
          <Router>
            <Route component={(props) => <App {...props} />} />
          </Router>
        </Auth0Provider>
      </Provider>,
      root,
    );
  }
});
