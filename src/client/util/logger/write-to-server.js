// @flow

import axios from 'axios';

import env from '../../../config';
import type { LogType } from '../../../util/logger/types';

/**
 * Assumes that the location being written to has been created.
 */
const writeToServer = ({ logType, msg }: { logType: LogType, msg: string }) => {
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
