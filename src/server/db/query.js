// @flow

import pool from './pool';
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
  const { rows } = await query(sql, args);

  const object = mapper(rows);

  const result = schema.validate(object);
  const { error, value } = result;

  if (error) {
    throw Object.assign(ERROR_CODE.DB_INVALID_OBJECT, error.details);
  }

  return value;
};
