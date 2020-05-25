// @flow

import { processDatabaseQuery } from '../db-query';
import { selectSummaryByUserIdSql } from './resume.sql';
import { resumeSummaryMapper } from './resume.mapper';
import { resumeSummarySchema } from './resume.schema';

export const selectSummaryByUserId = (userId: number) => processDatabaseQuery(
  selectSummaryByUserIdSql,
  [userId],
  resumeSummaryMapper,
  resumeSummarySchema,
);
