import { merge } from 'lodash';

import base from './env/base';
import prod from './env/prod';
import dev from './env/dev';

let mergedConfig;

const release = process.env['NODE_ENV'] || 'production';
switch (release) {
case 'development':
  mergedConfig = merge({}, base, dev);
  break;
default:
  mergedConfig = merge({}, base, prod);
  break;
}

const env = mergedConfig;

export default env;
