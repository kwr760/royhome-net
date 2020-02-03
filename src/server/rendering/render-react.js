import path from 'path';
import fs from 'fs';

import { ChunkExtractor } from '@loadable/server';
import React from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';

import env from '../../config';
import populateContext from './populate-context';

const renderReact = (req, res) => {
  const nodeStats = path.resolve(env.root, './dist/node/loadable-stats.json');
  const webStats = path.resolve(env.root, './dist/web/loadable-stats.json');

  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
  const { default: Main } = nodeExtractor.requireEntrypoint();
  const webExtractor = new ChunkExtractor({ statsFile: webStats });
  const context = populateContext(req);
  const jsx = webExtractor.collectChunks(<Main url={req.url} context={context} />);

  const markup = renderToString(jsx);

  const indexFile = path.resolve('./src/client/index.html');
  const contents = fs.readFileSync(indexFile, 'utf8');

  const responseHtml = contents
    .replace('{markup}', markup)
    .replace('{linkTags}', webExtractor.getLinkTags())
    .replace('{styleTags}', webExtractor.getStyleTags())
    .replace('{scriptTags}', webExtractor.getScriptTags())
    .replace('{initialData}', serialize(context));
  res.send(responseHtml);
};

export default renderReact;