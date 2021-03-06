import { Pool } from 'pg';
import dotenv from 'dotenv';
import Logger from '../../../common/server/logger';

// load the db connection information from local .env file.
dotenv.config();
const dbUser = process.env.DB_USER || '';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || '';
const dbPort = process.env.DB_PORT || '';
const dbDatabase = process.env.DB_DATABASE || '';
const dbConnectionString = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbDatabase}`;

const dbConfig = {
  connectionString: dbConnectionString,
};

const createPool = () => {
  Logger.debug(JSON.stringify(dbConfig));
  return new Pool(dbConfig);
};

export default createPool();
