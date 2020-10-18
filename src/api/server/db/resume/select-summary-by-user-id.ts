import { processDatabaseQuery } from '../db-query';
import { selectSummaryByUserIdSql } from './resume.sql';
import { resumeSummaryMapper, SummaryType } from './resume.mapper';
import { resumeSummarySchema } from './resume.schema';

export const selectSummaryByUserId = (userId: number): Promise<SummaryType> => processDatabaseQuery(
  selectSummaryByUserIdSql,
  [userId],
  resumeSummaryMapper,
  resumeSummarySchema,
) as Promise<SummaryType>;
