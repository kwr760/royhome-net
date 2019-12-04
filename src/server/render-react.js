import path from 'path';
import fs from 'fs';

import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, Route } from 'react-router-dom';

import App from '../web/components/App';
import Logger from './logger';

const renderReact = (req, res) => {
  const context = {};
  const appRenderer = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <Route component={App} />
    </StaticRouter>,
  );
  Logger.log(req.url);
  Logger.log(appRenderer);
  Logger.log(context);

  const indexFile = path.resolve('./dist/public/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error(`The following error: ${err}`);
      return res.sendStatus(INTERNAL_SERVER_ERROR);
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${appRenderer}</div>`,
      ),
    );
  });
};

export default renderReact;
