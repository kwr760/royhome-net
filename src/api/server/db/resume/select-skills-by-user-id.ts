import { SkillsType } from '../../../../types/resume.types';
import { processDatabaseQuery } from '../db-query';
import { selectSkillsByUserIdSql } from './resume.sql';
import { resumeSkillsMapper } from './resume.mapper';
import { resumeSkillsSchema } from './resume.schema';

export const selectSkillsByUserId = (userId: number): Promise<SkillsType[]> => processDatabaseQuery(
  selectSkillsByUserIdSql,
  [userId],
  resumeSkillsMapper,
  resumeSkillsSchema,
) as Promise<SkillsType[]>;
