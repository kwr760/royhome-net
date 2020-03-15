// @flow

import axios from 'axios';

import env from '../../../config';
import type { LogMsg } from '../../../server/logger/types';

/**
 * Assumes that the location being written to has been created.
 */
const writeToServer = ({ logType, msg }: LogMsg) => {
  const logUrl = `${env.host}/api/log`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios.put(logUrl, { logType, msg }, options)
    .catch((e) => {
      console.error(`Logging to server failed: ${e.message}`);
    });
};

export default writeToServer;
