import { processDatabaseQuery } from '../db-query';
import { selectSkillsByUserId } from './select-skills-by-user-id';
import { selectSkillByUserIdSql } from './resume.sql';
import { resumeSkillMapper } from './resume.mapper';
import { resumeSkillSchema } from './resume.schema';

jest.mock('../db-query');

describe('server/db/resume/select-skills-by-user-id', () => {
  it('should call the function correctly', () => {
    // Arrange
    const userId = 100;

    // Act
    selectSkillsByUserId(userId);

    // Assert
    expect(processDatabaseQuery).toHaveBeenCalledWith(
      selectSkillByUserIdSql,
      [userId],
      resumeSkillMapper,
      resumeSkillSchema,
    );
  });
});
