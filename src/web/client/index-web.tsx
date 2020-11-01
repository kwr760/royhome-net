/* eslint-disable no-underscore-dangle */
import 'core-js';
import React  from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router, Route, RouteComponentProps } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss';
import { StateType } from '../types/state.types';

import Auth0Provider from '../util/auth0/auth0-spa';
import { config } from '../util/auth0/auth0.constants';
import App from './App';
import createStore from './store/create-store';

declare global {
  interface Window {
    __PRELOADED_STATE__?: StateType;
  }
}

loadableReady(() => {
  const root = document.getElementById('main');
  if (root !== null) {
    const preloadedState = window.__PRELOADED_STATE__;
    delete window.__PRELOADED_STATE__;
    const store = createStore(preloadedState);
    hydrate(
      <Provider store={store}>
        <Auth0Provider
          domain={config.domain}
          client_id={config.clientId}
          audience={config.audience}
          redirect_uri={window.location.origin}
        >
          <Router>
            <Route component={(props: RouteComponentProps) => <App {...props} />} />
          </Router>
        </Auth0Provider>
      </Provider>,
      root,
    );
  }
});

