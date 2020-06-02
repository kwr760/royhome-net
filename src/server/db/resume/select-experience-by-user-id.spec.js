import { processDatabaseQuery } from '../db-query';
import { selectExperienceByUserId } from './select-experience-by-user-id';
import { selectExperienceByUserIdSql } from './resume.sql';
import { resumeExperienceMapper } from './resume.mapper';
import { resumeExperienceSchema } from './resume.schema';

jest.mock('../db-query');

describe('server/db/resume/select-skills-by-user-id', () => {
  it('should call the function correctly', () => {
    // Arrange
    const userId = 100;

    // Act
    selectExperienceByUserId(userId);

    // Assert
    expect(processDatabaseQuery).toHaveBeenCalledWith(
      selectExperienceByUserIdSql,
      [userId],
      resumeExperienceMapper,
      resumeExperienceSchema,
    );
  });
});
