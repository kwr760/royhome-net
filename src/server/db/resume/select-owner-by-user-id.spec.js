import { processDatabaseQuery } from '../query';
import { selectOwnerByUserIdSql } from './resume.sql';
import { resumeOwnerMapper } from './resume.mapper';
import { resumeOwnerSchema } from './resume.schema';
import { selectOwnerByUserId } from './select-owner-by-user-id';

jest.mock('../query');

describe('server/db/resume/select-owner-by-user-id', () => {
  xit('should call the function correctly', () => {
    // Arrange
    const userId = 100;

    // Act
    selectOwnerByUserId(userId);

    // Assert
    expect(processDatabaseQuery).toHaveBeenCalledWith(
      selectOwnerByUserIdSql,
      [userId],
      resumeOwnerMapper,
      resumeOwnerSchema,
    );
  });
});
