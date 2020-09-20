// @flow

import { processDatabaseQuery } from '../db-query';
import { selectAddressByUserIdSql } from './resume.sql';
import { resumeAddressMapper } from './resume.mapper';
import { resumeAddressSchema } from './resume.schema';

export const selectAddressByUserId = (userId: number) => processDatabaseQuery(
  selectAddressByUserIdSql,
  [userId],
  resumeAddressMapper,
  resumeAddressSchema,
);
