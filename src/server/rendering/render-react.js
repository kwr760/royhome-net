import path from 'path';
import fs from 'fs';

import { ChunkExtractor } from '@loadable/server';
import React from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';

import populateContext from './populate-context';
import displayMessage from '../middleware/display-message';
import env from '../../config';

const renderReact = (req, res) => {
  displayMessage(`Server render:  ${req.url}`);

  // Extract the creation of the markup to a separate file
  const nodeStats = path.resolve(env.root, './dist/node/loadable-stats.json');
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
  const { default: Main } = nodeExtractor.requireEntrypoint();
  const webStats = path.resolve(env.root, './dist/web/loadable-stats.json');
  const webExtractor = new ChunkExtractor({ statsFile: webStats });
  const context = populateContext(req);
  const jsx = webExtractor.collectChunks(<Main url={req.url} context={context} />);
  const markup = renderToString(jsx);

  // Extract the creation of the html to a separate file
  const indexFile = path.resolve('./src/client/assets/index.html');
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
