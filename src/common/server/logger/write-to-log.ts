import fs from 'fs';

/**
 * Assumes that the location being written to has been created.
 */
const writeToLog = (file: string, msg: string): void => {
  fs.appendFile(file, `${msg}\n`, (err) => {
    if (err) {
      console.error(err);
      throw err;
    }
  });
};

export default writeToLog;
