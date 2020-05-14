// @flow

import { processDatabaseQuery } from '../db-query';
import { selectContactByUserIdSql } from './resume.sql';
import { resumeContactMapper } from './resume.mapper';
import { resumeContactSchema } from './resume.schema';

export const selectContactByUserId = (userId: number) => processDatabaseQuery(
  selectContactByUserIdSql,
  [userId],
  resumeContactMapper,
  resumeContactSchema,
);
