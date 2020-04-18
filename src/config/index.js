// @flow

import { get, merge } from 'lodash';

import base from './env/base';
import prod from './env/prod';
import dev from './env/dev';

let mergedConfig;
switch (get(process, 'env.RELEASE_ENV', 'prod')) {
case 'dev':
  mergedConfig = merge({}, base, dev);
  break;
default:
  mergedConfig = merge({}, base, prod);
  break;
}

const env = mergedConfig;

export default env;
