import Logger from './index';
import LOG_LEVELS from '../../../util/logger/levels';
import log from './log';

jest.mock('./log');

describe('server/logger/index', () => {
  test.each([
    [Logger.debug, LOG_LEVELS.DEBUG],
    [Logger.log, LOG_LEVELS.INFO],
    [Logger.warning, LOG_LEVELS.WARN],
    [Logger.error, LOG_LEVELS.ERROR],
    [Logger.fatal, LOG_LEVELS.FATAL],
  ])(
    'Each method should call the log with the right level', (logger, level) => {
      // Arrange/Act
      logger('Test Message');

      // Assert
      expect(log).toBeCalledWith({
        level,
        msg: 'Test Message',
      });
    },
  );
});
