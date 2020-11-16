import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { StaticRouter as Router } from 'react-router';
import { Route, RouteComponentProps } from 'react-router-dom';
import { Store } from 'redux';
import Auth0Provider from '../util/auth0/auth0-node';
import { config } from '../util/auth0/auth0.constants';
import App from './App';
import theme from './theme';

interface Props {
  url?: string;
  store: Store;
}
const Main: FunctionComponent<Props> = ({ url, store }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        audience={config.audience}
        redirect_uri={window.location.origin}
      >
        <Router location={url}>
          <Route component={
            (props: RouteComponentProps) => <App {...props} />
          }
          />
        </Router>
      </Auth0Provider>
    </Provider>
  </ThemeProvider>
);

export default Main;
