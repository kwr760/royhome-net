import { LoginType } from '../../../../types/login.types';
import { processDatabaseQuery } from '../db-query';
import { selectLoginByEmailSql } from './login.sql';
import { loginMapper } from './login.mapper';
import { loginSchema } from './login.schema';

export const selectUserIdByEmail = (
  email: string,
): Promise<LoginType> => processDatabaseQuery(
  selectLoginByEmailSql,
  [email],
  loginMapper,
  loginSchema,
) as Promise<LoginType>;
