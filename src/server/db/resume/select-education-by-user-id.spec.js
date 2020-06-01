import { processDatabaseQuery } from '../db-query';
import { selectEducationByUserId } from './select-education-by-user-id';
import { selectEducationByUserIdSql } from './resume.sql';
import { resumeEducationMapper } from './resume.mapper';
import { resumeEducationSchema } from './resume.schema';

jest.mock('../db-query');

describe('server/db/resume/select-education-by-user-id', () => {
  it('should call the function correctly', () => {
    // Arrange
    const userId = 100;

    // Act
    selectEducationByUserId(userId);

    // Assert
    expect(processDatabaseQuery).toHaveBeenCalledWith(
      selectEducationByUserIdSql,
      [userId],
      resumeEducationMapper,
      resumeEducationSchema,
    );
  });
});
