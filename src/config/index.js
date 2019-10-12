import _ from 'lodash';

import base from './env/base';

let envType = 'dev';
if (process.env.CONFIG_TYPE) {
  envType = `${process.env.CONFIG_TYPE}`;
}
const envPath = `./env/${envType}`;
const envConfig = require(envPath);

export default _.merge({}, base, envConfig);
