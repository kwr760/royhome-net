import LOG_LEVELS from '../../../../common/util/logger/logger-levels';
import Logger from './index';
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
    'Each method should call the log with the right logType', (logger, logType) => {
      // Arrange/Act
      logger('Test Message');

      // Assert
      expect(log).toBeCalledWith({
        logType,
        msg: 'Test Message',
      });
    },
  );
});
