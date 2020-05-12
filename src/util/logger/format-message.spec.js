import formatMessage from './format-message';
import LOG_TYPE from './levels';

describe('util/logger/format-message', () => {
  xit('should format a message', () => {
    // Arrange
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() => new Date('2000-01-01T01:01:01.000').valueOf());

    // Act
    const result = formatMessage(LOG_TYPE.ERROR, 'The log message');

    // Assert
    expect(result).toMatch(/^2000-01-01_01:01:01.000:/);
    expect(result).toMatch(/:ERROR:"The log message"$/);
  });
});
