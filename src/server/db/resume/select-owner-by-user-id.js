// @flow

import { processDatabaseQuery } from '../query';
import { selectOwnerByUserIdSql } from './resume.sql';
import { resumeOwnerMapper } from './resume.mapper';
import { resumeOwnerSchema } from './resume.schema';

export const selectOwnerByUserId = (userId: number) => processDatabaseQuery(
  selectOwnerByUserIdSql,
  [userId],
  resumeOwnerMapper,
  resumeOwnerSchema,
);
