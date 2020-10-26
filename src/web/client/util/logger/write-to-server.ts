import axios from 'axios';
import { LogMsgType } from '../../../../types/logger.types';
import { ApiConfigs } from '../api/api.config';

import { getParsedUrl } from '../api/get-parsed-url';

import { getApiUrl } from '../api/get-api-url';

/**
 * Assumes that the location being written to has been created.
 */
const writeToServer = ({ logType, msg }: LogMsgType): void => {
  const apiUrl = getApiUrl();
  const params = {};
  const logUrl = getParsedUrl(apiUrl, ApiConfigs.PUT_LOG.path, params);
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
