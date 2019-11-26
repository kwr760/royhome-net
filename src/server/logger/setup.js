import fs from 'fs';
import path from 'path';
import env from '../../config';

const setup = () => {
  const { root } = env;
  const { dir } = env.log;
  const logDir = path.resolve(root, dir);

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
};

export default setup;
