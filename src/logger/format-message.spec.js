import formatMessage from './format-message';
import LOG_LEVELS from './levels';

describe('logger/format-message', () => {
  it('should format a message', () => {
    // Arrange
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() => new Date('2000-01-01T21:01:01.000Z').valueOf());

    // Act
    const result = formatMessage(LOG_LEVELS.ERROR, 'The log message');

    // Assert
    expect(result).toMatch(/^2000-01-01_01-01-01:/);
    expect(result).toMatch(/:ERROR:The log message$/);
  });
});
