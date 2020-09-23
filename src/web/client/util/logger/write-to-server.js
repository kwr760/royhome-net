// @flow

import axios from 'axios';

import type { LogMsgType } from '@common/server/logger/logger.types';
import { getParsedUrl } from '../url/get-parsed-url';

import { ApiConfigs } from '../../store/api/api.contants';
import { getApiUrl } from '../url/get-api-url';

/**
 * Assumes that the location being written to has been created.
 */
const writeToServer = ({ logType, msg }: LogMsgType) => {
  const apiUrl = getApiUrl();
  const action = {
    type: '',
    params: {},
    payload: {},
  };
  const logUrl = getParsedUrl(ApiConfigs.PUT_LOG, action, apiUrl);
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
