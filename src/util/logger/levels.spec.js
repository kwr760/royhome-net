import LOG_LEVELS, { LEVEL_NAMES } from './levels';

describe('util/logger/levels', () => {
  it('should load the expected levels', () => {
    // Arrange/Act
    const loadedLevels = LOG_LEVELS;

    // Assert
    expect(loadedLevels).toEqual({
      DEBUG: 1,
      INFO: 2,
      WARN: 3,
      ERROR: 4,
      FATAL: 5,
      OFF: 9,
    });
    expect(Object.keys(LOG_LEVELS).length).toEqual(Object.keys(LEVEL_NAMES).length);
  });
});
