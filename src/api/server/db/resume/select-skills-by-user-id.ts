import { processDatabaseQuery } from '../db-query';
import { selectSkillsByUserIdSql } from './resume.sql';
import { resumeSkillsMapper, SkillType } from './resume.mapper';
import { resumeSkillsSchema } from './resume.schema';

export const selectSkillsByUserId = (userId: number): Promise<SkillType[]> => processDatabaseQuery(
  selectSkillsByUserIdSql,
  [userId],
  resumeSkillsMapper,
  resumeSkillsSchema,
) as Promise<SkillType[]>;
