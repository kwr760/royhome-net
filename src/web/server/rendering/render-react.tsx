import path from 'path';
import fs from 'fs';
import parseUrl from 'parseurl';
import { Request, Response } from 'express';
import { ChunkExtractor } from '@loadable/server';
import React, { ComponentType } from 'react';
import { renderToString } from 'react-dom/server';
import { Store } from 'redux';
import { ServerStyleSheets } from '@material-ui/core/styles';

import env from '../../../config';
import populateState from './populate-state';
import displayMessage from '../../../common/server/middleware/display-message';
import createStore from '../../client/store/create-store';

interface Props {
  url: string,
  store: Store,
}
interface MainType {
  default: ComponentType<Props>,
}
const renderReact = async (req: Request, res: Response): Promise<void> => {
  displayMessage(`Server render:  ${req.url}`);

  // Extract the creation of the markup to a separate file
  const nodeStats = path.resolve(env.root, './dist/node/loadable-stats.json');
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
  const { default: Main } = nodeExtractor.requireEntrypoint() as unknown as MainType;
  const webStats = path.resolve(env.root, './dist/web/loadable-stats.json');
  const webExtractor = new ChunkExtractor({ statsFile: webStats });
  const url = parseUrl(req) || { pathname: ''};
  const pathname = url.pathname || '';
  const { cookies } = req;
  const state = await populateState(pathname, cookies);
  const store = createStore(state);
  const sheets = new ServerStyleSheets();
  const jsx = webExtractor.collectChunks(
    sheets.collect(<Main
      url={pathname}
      store={store}
    />),
  );
  const markup = renderToString(jsx);
  const css = sheets.toString();

  // Extract the creation of the html to a separate file
  const indexFile = path.resolve('./src/web/client/assets/index.html');
  const contents = fs.readFileSync(indexFile, 'utf8');
  const preloadedState = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
  const responseHtml = contents
    .replace('{css}', css)
    .replace('{markup}', markup)
    .replace('{linkTags}', webExtractor.getLinkTags())
    .replace('{styleTags}', webExtractor.getStyleTags())
    .replace('{scriptTags}', webExtractor.getScriptTags())
    .replace('{preloadedState}', preloadedState);
  res.send(responseHtml);
};

export default renderReact;
