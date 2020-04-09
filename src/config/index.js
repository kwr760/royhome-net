// @flow
import _ from 'lodash';

import base from './env/base';
import prod from './env/prod';
import dev from './env/dev';

let mergedConfig;
switch (_.get(process, 'env.RELEASE_ENV', 'prod')) {
case 'dev':
  mergedConfig = _.merge({}, base, dev);
  break;
default:
  mergedConfig = _.merge({}, base, prod);
  break;
}

const env = mergedConfig;

export default env;
