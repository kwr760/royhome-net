import { EducationType } from '../../../../types/resume.types';
import { processDatabaseQuery } from '../db-query';
import { selectEducationByUserIdSql } from './resume.sql';
import { resumeEducationMapper } from './resume.mapper';
import { resumeEducationSchema } from './resume.schema';

export const selectEducationByUserId = (userId: number): Promise<EducationType[]> => processDatabaseQuery(
  selectEducationByUserIdSql,
  [userId],
  resumeEducationMapper,
  resumeEducationSchema,
) as Promise<EducationType[]>;
