import Logger from './index';
import LOG_TYPE from '../../util/logger/levels';
import log from './log';

jest.mock('./log');

describe('server/logger/index', () => {
  test.each([
    [Logger.debug, LOG_TYPE.DEBUG],
    [Logger.log, LOG_TYPE.INFO],
    [Logger.warning, LOG_TYPE.WARN],
    [Logger.error, LOG_TYPE.ERROR],
    [Logger.fatal, LOG_TYPE.FATAL],
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
