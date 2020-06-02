import { processDatabaseQuery } from '../db-query';
import { selectSkillsByUserId } from './select-skills-by-user-id';
import { selectSkillsByUserIdSql } from './resume.sql';
import { resumeSkillsMapper } from './resume.mapper';
import { resumeSkillsSchema } from './resume.schema';

jest.mock('../db-query');

describe('server/db/resume/select-skills-by-user-id', () => {
  it('should call the function correctly', () => {
    // Arrange
    const userId = 100;

    // Act
    selectSkillsByUserId(userId);

    // Assert
    expect(processDatabaseQuery).toHaveBeenCalledWith(
      selectSkillsByUserIdSql,
      [userId],
      resumeSkillsMapper,
      resumeSkillsSchema,
    );
  });
});
