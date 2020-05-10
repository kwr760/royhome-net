// @flow

import pool from './pool';
import Logger from '../logger';
import { ERROR_CODE } from './error-codes';

const query = (sql: string, params: Array<any>): any => new Promise<any>((resolve, reject) => {
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
    const { rows } = await query(sql, args);

    const object = mapper(rows);

    result = schema.validate(object);
  } catch (error) {
    Logger.error(JSON.stringify(error));
    throw ERROR_CODE.DB_UNKNOWN_ERROR;
  }

  const { error, value } = result;

  if (error) {
    throw Object.assign(ERROR_CODE.DB_INVALID_OBJECT, error.details);
  }

  return value;
};
