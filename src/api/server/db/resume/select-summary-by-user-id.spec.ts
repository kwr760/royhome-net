import { processDatabaseQuery } from '../db-query';
import { selectSummaryByUserId } from './select-summary-by-user-id';
import { selectSummaryByUserIdSql } from './resume.sql';
import { resumeSummaryMapper } from './resume.mapper';
import { resumeSummarySchema } from './resume.schema';

jest.mock('../db-query');

describe('server/db/resume/select-summary-by-user-id', () => {
  it('should call the function correctly', () => {
    // Arrange
    const userId = 100;

    // Act
    selectSummaryByUserId(userId);

    // Assert
    expect(processDatabaseQuery).toHaveBeenCalledWith(
      selectSummaryByUserIdSql,
      [userId],
      resumeSummaryMapper,
      resumeSummarySchema,
    );
  });
});
