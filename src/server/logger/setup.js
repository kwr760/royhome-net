import fs from 'fs';
import path from 'path';
import env from '../../config';

const setup = () => {
  const { root } = env;
  const { dir } = env.log;
  const logDir = path.resolve(root, dir);

  fs.access(logDir, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdir(logDir, { recursive: true });
    }
  });
};

export default setup;
