import axios from 'axios';

import env from '../../config';

/**
 * Assumes that the location being written to has been created.
 */
const writeToServer = ({ level, msg }) => {
  const logUrl = `${env.host}/api/log`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios.put(logUrl, { level, msg }, options)
    .catch((e) => {
      console.error(`Logging to server failed: ${e.message}`);
    });
};

export default writeToServer;
