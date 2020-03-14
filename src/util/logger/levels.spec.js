import LOG_TYPE from './levels';

describe('util/logger/levels', () => {
  it('should load the expected levels', () => {
    // Arrange/Act
    const loadedLevels = LOG_TYPE;

    // Assert
    expect(loadedLevels).toEqual({
      DEBUG: {
        level: 1,
        name: 'DEBUG',
      },
      INFO: {
        level: 2,
        name: 'INFO',
      },
      WARN: {
        level: 3,
        name: 'WARN',
      },
      ERROR: {
        level: 4,
        name: 'ERROR',
      },
      FATAL: {
        level: 5,
        name: 'FATAL',
      },
      OFF: {
        level: 0,
        name: 'OFF',
      },
    });
  });
});
