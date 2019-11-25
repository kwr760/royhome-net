import LOG_LEVELS from '../../util/logger/levels';
import log from './log';

describe('server/logger/log', () => {
  it('should not log anything', () => {
    // Arrange
    const msg = 'Log message';
    const logMsg = {
      level: LOG_LEVELS.INFO,
      msg,
    };
    global.console.log = jest.fn();

    // Act
    log(logMsg);

    // Assert
    expect(console.log).not.toBeCalled();
  });
});
