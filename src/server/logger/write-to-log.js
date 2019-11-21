import fs from 'fs';

/**
 * Assumes that the location being written to has been created.
 */
const writeToLog = (file, msg) => {
  fs.appendFile(file, msg, (err) => {
    throw err;
  });
};

export default writeToLog;
