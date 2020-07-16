import LOG_LEVELS from '@src/util/logger/logger-levels';
import putLogHandler from './put-log';
import Logger from '../../logger';

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
