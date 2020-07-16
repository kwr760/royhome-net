// @flow

import path from 'path';
import fs from 'fs';

import { ChunkExtractor } from '@loadable/server';
import React from 'react';
import { renderToString } from 'react-dom/server';

import env from '@src/config';
import populateState from './populate-state';
import displayMessage from '../middleware/display-message';
import configureStore from '../../client/store/configure-store';

const renderReact = async (req: Request, res: Response) => {
  displayMessage(`Server render:  ${req.url}`);

  // Extract the creation of the markup to a separate file
  const nodeStats = path.resolve(env.root, './dist/node/loadable-stats.json');
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
  const { default: Main } = nodeExtractor.requireEntrypoint();
  const webStats = path.resolve(env.root, './dist/web/loadable-stats.json');
  const webExtractor = new ChunkExtractor({ statsFile: webStats });
  const state = await populateState(req);
  const store = configureStore(state);
  const jsx = webExtractor.collectChunks(
    <Main
      url={req.url}
      store={store}
    />,
  );
  const markup = renderToString(jsx);

  // Extract the creation of the html to a separate file
  const indexFile = path.resolve('./src/client/assets/index.html');
  const contents = fs.readFileSync(indexFile, 'utf8');
  const preloadedState = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
  const responseHtml = contents
    .replace('{markup}', markup)
    .replace('{linkTags}', webExtractor.getLinkTags())
    .replace('{styleTags}', webExtractor.getStyleTags())
    .replace('{scriptTags}', webExtractor.getScriptTags())
    .replace('{preloadedState}', preloadedState);
  res.send(responseHtml);
};

export default renderReact;
