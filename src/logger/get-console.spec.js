import LOG_LEVELS from './levels';
import getConsole from './get-console';

describe('logger/get-console', () => {
  test.each([LOG_LEVELS.DEBUG, LOG_LEVELS.INFO])(
    'should return the console.log', (level) => {
      // Arrange/Act
      const result = getConsole(level);

      // Assert
      expect(result).toBe(console.log);
    },
  );
  test.each([LOG_LEVELS.WARN])(
    'should return the console.warn', (level) => {
      // Arrange/Act
      const result = getConsole(level);

      // Assert
      expect(result).toBe(console.warn);
    },
  );
  test.each([LOG_LEVELS.ERROR, LOG_LEVELS.FATAL])(
    'should return the console.error', (level) => {
      // Arrange/Act
      const result = getConsole(level);

      // Assert
      expect(result).toBe(console.error);
    },
  );
  test.each([LOG_LEVELS.OFF])(
    'should return the console.log', (level) => {
      // Arrange/Act
      const result = getConsole(level);

      // Assert
      expect(result).toBe(console.log);
    },
  );
});
