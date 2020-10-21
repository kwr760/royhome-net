import { SummaryType } from '../../../../types/resume.types';
import { processDatabaseQuery } from '../db-query';
import { selectSummaryByUserIdSql } from './resume.sql';
import { resumeSummaryMapper } from './resume.mapper';
import { resumeSummarySchema } from './resume.schema';

export const selectSummaryByUserId = (userId: number): Promise<SummaryType> => processDatabaseQuery(
  selectSummaryByUserIdSql,
  [userId],
  resumeSummaryMapper,
  resumeSummarySchema,
) as Promise<SummaryType>;
