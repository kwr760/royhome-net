import React from 'react';
import { StaticRouter, Route } from 'react-router-dom';

import App from './components/App';

const Main = (req, context) => (
  <StaticRouter location={req.url} context={context}>
    <Route component={App} />
  </StaticRouter>
);

export default Main;
