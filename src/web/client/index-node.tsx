import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter as Router, Route } from 'react-router-dom';

import Auth0Provider from '../util/auth0/auth0-node';
import { config } from '../util/auth0/auth0.constants';
import App from './App';

interface Props {
  url: string;
  store: unknown;
}
const Main = ({ url, store }: Props): JSX.Element => (
  <Provider store={store}>
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
    >
      <Router location={url} context={{}}>
        <Route component={(props) => <App {...props} />} />
      </Router>
    </Auth0Provider>
  </Provider>
);

export default Main;
