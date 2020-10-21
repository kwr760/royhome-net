import { processDatabaseQuery } from '../db-query';
import { selectContactByUserIdSql } from './resume.sql';
import { ContactType, resumeContactMapper } from './resume.mapper';
import { resumeContactSchema } from './resume.schema';

export const selectContactByUserId = (userId: number): Promise<ContactType> => processDatabaseQuery(
  selectContactByUserIdSql,
  [userId],
  resumeContactMapper,
  resumeContactSchema,
) as Promise<ContactType>;
