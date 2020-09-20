import LOG_LEVELS from '@common/util/logger/logger-levels';
import Logger from '@common/server/logger';
import putLogHandler from './put-log';

describe('server/routes/log/put', () => {
  it('should return default response', () => {
    // Arrange
    const msg = {
      logType: LOG_LEVELS.WARN,
      msg: {
        message: 'Log this message',
      },
    };
    const req = {
      body: msg,
    };
    Logger.writeLog = jest.fn();

    // Act
    putLogHandler(req);

    // Assert
    expect(Logger.writeLog).toHaveBeenCalledWith(msg);
  });
});
