import path from 'path';
// import fs from 'fs';

// import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

// eslint-disable-next-line import/no-extraneous-dependencies
import { ChunkExtractor } from '@loadable/server';
import React from 'react';
import { renderToString } from 'react-dom/server';
// import { StaticRouter, Route } from 'react-router-dom';

// import App from '../../client/components/App';
import env from '../../config';
import fs from "fs";
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

// const renderStaticRouter = (req, res) => {
//   const context = {};
//   const appRenderer = renderToString(
//     <StaticRouter location={req.url} context={context}>
//       <Route component={App} />
//     </StaticRouter>,
//   );
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

  const markup = renderToString(jsx);

  const indexFile = path.resolve('./src/client/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error(`The following error: ${err}`);
      return res.sendStatus(INTERNAL_SERVER_ERROR);
    }

    const responseHtml = data
      .replace('{markup}', markup)
      .replace('{linkTags}', webExtractor.getLinkTags())
      .replace('{styleTags}', webExtractor.getStyleTags())
      .replace('{scriptTags}', webExtractor.getScriptTags());
    return res.send(responseHtml);
  });
};

export default renderReact;
