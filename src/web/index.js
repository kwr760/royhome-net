import env from '../config';
import renderServerSide from './render-server-side';
import renderClientSide from './render-client-side';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

if (env.server.rendering) {
  renderServerSide();
} else {
  renderClientSide();
}
