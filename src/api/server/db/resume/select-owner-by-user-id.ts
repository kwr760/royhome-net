import { OwnerType } from '../../../../types/resume.types';
import { processDatabaseQuery } from '../db-query';
import { selectOwnerByUserIdSql } from './resume.sql';
import { resumeOwnerMapper } from './resume.mapper';
import { resumeOwnerSchema } from './resume.schema';

export const selectOwnerByUserId = (userId: number): Promise<OwnerType> => processDatabaseQuery(
  selectOwnerByUserIdSql,
  [userId],
  resumeOwnerMapper,
  resumeOwnerSchema,
) as Promise<OwnerType>;
