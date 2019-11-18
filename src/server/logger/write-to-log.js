import fs from 'fs';

const writeToLog = (file, msg) => {
  fs.appendFile(file, msg, (err) => {
    throw err;
  });
};

export default writeToLog;
