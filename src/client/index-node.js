// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss';

import Auth0Provider from '../util/auth0/react-auth0-node';
import { config } from '../util/auth0/constants';
import App from './App';
import { type Props } from './types';
import configureStore from './store/configure';

const onRedirectCallback = () => {};

const store = configureStore();

const Main = ({ url, context }: Props) => (
  <Provider store={store}>
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      onRedirectCallback={onRedirectCallback}
      context={context}
    >
      <Router location={url} context={{}}>
        <Route component={(props) => <App {...props} context={context} />} />
      </Router>
    </Auth0Provider>
  </Provider>
);

export default Main;
