import { AddressType } from '../../../../types/resume.types';
import { processDatabaseQuery } from '../db-query';
import { selectAddressByUserIdSql } from './resume.sql';
import { resumeAddressMapper } from './resume.mapper';
import { resumeAddressSchema } from './resume.schema';

export const selectAddressByUserId = (userId: number): Promise<AddressType> => processDatabaseQuery(
  selectAddressByUserIdSql,
  [userId],
  resumeAddressMapper,
  resumeAddressSchema,
) as Promise<AddressType>;
