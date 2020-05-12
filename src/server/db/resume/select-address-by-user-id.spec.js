import { processDatabaseQuery } from '../query';
import { selectAddressByUserId } from './select-address-by-user-id';
import { selectAddressByUserIdSql } from './resume.sql';
import { resumeAddressMapper } from './resume.mapper';
import { resumeAddressSchema } from './resume.schema';

jest.mock('../query');

describe('server/db/resume/select-address-by-user-id', () => {
  xit('should call the function correctly', () => {
    // Arrange
    const userId = 100;

    // Act
    selectAddressByUserId(userId);

    // Assert
    expect(processDatabaseQuery).toHaveBeenCalledWith(
      selectAddressByUserIdSql,
      [userId],
      resumeAddressMapper,
      resumeAddressSchema,
    );
  });
});
