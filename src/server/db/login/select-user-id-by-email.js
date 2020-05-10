// @flow

import { processDatabaseQuery } from '../query';
import { selectLoginByEmailSql } from './login.sql';
import { loginMapper } from './login.mapper';
import { loginSchema } from './login.schema';

export const selectUserIdByEmail = (email: string) => processDatabaseQuery(
  selectLoginByEmailSql,
  [email],
  loginMapper,
  loginSchema,
);
