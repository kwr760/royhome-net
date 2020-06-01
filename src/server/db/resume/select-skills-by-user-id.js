// @flow

import { processDatabaseQuery } from '../db-query';
import { selectSkillByUserIdSql } from './resume.sql';
import { resumeSkillMapper } from './resume.mapper';
import { resumeSkillSchema } from './resume.schema';

export const selectSkillsByUserId = (userId: number) => processDatabaseQuery(
  selectSkillByUserIdSql,
  [userId],
  resumeSkillMapper,
  resumeSkillSchema,
);
