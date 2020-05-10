import putLogHandler from './put-log';
import LOG_TYPE from '../../../util/logger/levels';
import Logger from '../../logger';

describe('server/routes/log/put', () => {
  it('should return default response', () => {
    // Arrange
    const msg = {
      logType: LOG_TYPE.WARN,
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
