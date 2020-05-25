// @flow

import pool from './db-pool';
import Logger from '../logger';
import { ERROR_CODE } from '../../util/error-codes';

const dbQuery = (sql: string, params: Array<any>): any => new Promise<any>((resolve, reject) => {
  pool.query(sql, params)
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
});

export const processDatabaseQuery = async (sql: string, args: Array<any>, mapper: function, schema: function) => {
  let result;
  try {
    const { rows } = await dbQuery(sql, args);

    const object = mapper(rows);

    result = schema.validate(object);
  } catch (error) {
    Logger.debug(JSON.stringify(sql));
    Logger.error(JSON.stringify(error));
    throw ERROR_CODE.DB_UNKNOWN_ERROR;
  }

  const { error, value } = result;

  if (error) {
    const errorCode = ERROR_CODE.DB_INVALID_OBJECT;
    const { details } = error;
    throw { ...errorCode, ...details };
  }

  return value;
};
