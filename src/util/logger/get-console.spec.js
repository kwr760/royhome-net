import LOG_TYPE from './levels';
import getConsole from './get-console';

describe('util/logger/get-console', () => {
  test.each([LOG_TYPE.DEBUG, LOG_TYPE.INFO])(
    'should return the console.log', (level) => {
      // Arrange/Act
      const result = getConsole(level);

      // Assert
      expect(result).toBe(console.log);
    },
  );
  test.each([LOG_TYPE.WARN])(
    'should return the console.warn', (level) => {
      // Arrange/Act
      const result = getConsole(level);

      // Assert
      expect(result).toBe(console.warn);
    },
  );
  test.each([LOG_TYPE.ERROR, LOG_TYPE.FATAL])(
    'should return the console.error', (level) => {
      // Arrange/Act
      const result = getConsole(level);

      // Assert
      expect(result).toBe(console.error);
    },
  );
  test.each([LOG_TYPE.OFF])(
    'should return the console.log', (level) => {
      // Arrange/Act
      const result = getConsole(level);

      // Assert
      expect(result).toBe(console.log);
    },
  );
});
