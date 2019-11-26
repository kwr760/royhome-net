import putLogHandler from './put';
import LOG_LEVELS from '../../../util/logger/levels';
import Logger from '../../logger';

describe('server/routes/log/put', () => {
  it('should return default response', () => {
    // Arrange
    const msg = {
      level: LOG_LEVELS.WARN,
      msg: {
        message: 'Log this message',
      },
    };
    const req = {
      body: msg,
    };
    const res = {};
    Logger.writeLog = jest.fn();

    // Act
    putLogHandler(req, res);

    // Assert
    expect(Logger.writeLog).toHaveBeenCalledWith(msg);
  });
});
