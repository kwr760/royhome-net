import { CssBaseline } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { StaticRouter as Router, Route, RouteComponentProps } from 'react-router-dom';
import { Store } from 'redux';
import { ThemeProvider } from '@material-ui/core/styles';

import Auth0Provider from '../util/auth0/auth0-node';
import { config } from '../util/auth0/auth0.constants';
import App from './App';
import themeLight  from './theme-light';

interface Props {
  url: string;
  store: Store;
}
const Main: FunctionComponent<Props> = ({ url, store }) => (
  <Provider store={store}>
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
      >
        <Router location={url} context={{}}>
          <Route component={
            (props: RouteComponentProps) => <App {...props} />
          }
          />
        </Router>
      </Auth0Provider>
    </ThemeProvider>
  </Provider>
);

export default Main;
