// @flow

import { processDatabaseQuery } from '../db-query';
import { selectExperienceByUserIdSql } from './resume.sql';
import { resumeExperienceMapper } from './resume.mapper';
import { resumeExperienceSchema } from './resume.schema';

export const selectExperienceByUserId = (userId: number) => processDatabaseQuery(
  selectExperienceByUserIdSql,
  [userId],
  resumeExperienceMapper,
  resumeExperienceSchema,
);
