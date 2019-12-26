import path from 'path';
// import fs from 'fs';

// import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

// eslint-disable-next-line import/no-extraneous-dependencies
import { ChunkExtractor } from '@loadable/server';
import React from 'react';
import { renderToString } from 'react-dom/server';
// import { StaticRouter, Route } from 'react-router-dom';

// import App from '../../client/components/App';
// import Logger from '../logger';
import env from '../../config';

// const renderStaticRouter = (req, res) => {
//   const context = {};
//   const appRenderer = renderToString(
//     <StaticRouter location={req.url} context={context}>
//       <Route component={App} />
//     </StaticRouter>,
//   );
//   Logger.log(req.url);
//   Logger.log(appRenderer);
//   Logger.log(context);
//
//   const indexFile = path.resolve('./dist/public/index.html');
//   fs.readFile(indexFile, 'utf8', (err, data) => {
//     if (err) {
//       console.error(`The following error: ${err}`);
//       return res.sendStatus(INTERNAL_SERVER_ERROR);
//     }
//
//     return res.send(
//       data.replace(
//         '<div id="root"></div>',
//         `<div id="root">${appRenderer}</div>`,
//       ),
//     );
//   });
// };

const renderReact = (req, res) => {
  const nodeStats = path.resolve(env.root, './dist/node/loadable-stats.json');
  const webStats = path.resolve(env.root, './dist/web/loadable-stats.json');

  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
  const { default: App } = nodeExtractor.requireEntrypoint();

  const webExtractor = new ChunkExtractor({ statsFile: webStats });
  const jsx = webExtractor.collectChunks(<App />);

  const html = renderToString(jsx);

  // res.set('content-type', 'text/html');
  return res.send(`
    <!DOCTYPE html>
    <html>
      <head>
      ${webExtractor.getLinkTags()}
      ${webExtractor.getStyleTags()}
      <base href="/" >
      </head>
      <body>
        <div id="main">${html}</div>
        ${webExtractor.getScriptTags()}
      </body>
    </html>
  `);
};

export default renderReact;
