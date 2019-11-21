import _ from 'lodash';

import base from './env/base';

let envType = 'dev';
if (process.env.RELEASE_ENV) {
  envType = process.env.RELEASE_ENV;
}
const envConfig = require(`./env/${envType}.js`).default;

const env = _.merge({}, base, envConfig);

export default env;
