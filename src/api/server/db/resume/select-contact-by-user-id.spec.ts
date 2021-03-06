import { processDatabaseQuery } from '../db-query';
import { selectContactByUserId } from './select-contact-by-user-id';
import { selectContactByUserIdSql } from './resume.sql';
import { resumeContactMapper } from './resume.mapper';
import { resumeContactSchema } from './resume.schema';

jest.mock('../db-query');

describe('server/db/resume/select-contact-by-user-id', () => {
  it('should call the function correctly', () => {
    // Arrange
    const userId = 100;

    // Act
    selectContactByUserId(userId);

    // Assert
    expect(processDatabaseQuery).toHaveBeenCalledWith(
      selectContactByUserIdSql,
      [userId],
      resumeContactMapper,
      resumeContactSchema,
    );
  });
});
