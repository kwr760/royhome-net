import env from '../../config';

/**
 * Assumes that the location being written to has been created.
 */
const writeToServer = ({ level, msg }) => {
  const logUrl = `${env.host}/api/log`;
  const args = {
    method: 'PUT',
    body: JSON.stringify({ level, msg }),
    headers: { 'Content-Type': 'application/json' },
  };

  // try {
  //   fetch(logUrl, args);
  // } catch (e) {
  //   console.error(`Logging to server failed: ${e.message}`);
  // }
  fetch(logUrl, args)
    .catch((e) => {
      console.error(`Logging to server failed: ${e.message}`);
    });
};

export default writeToServer;
