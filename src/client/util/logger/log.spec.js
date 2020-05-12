import env from '../../../config';

import LOG_TYPE from '../../../util/logger/levels';
import log from './log';

import getConsole from '../../../util/logger/get-console';
import writeToServer from './write-to-server';
import formatMessage from '../../../util/logger/format-message';

jest.mock('../../../util/logger/format-message');
jest.mock('./write-to-server');
jest.mock('../../../util/logger/get-console');

describe('server/logger/log', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  xit('should not log anything', () => {
    // Arrange
    env.log = {
      dir: 'dir_name',
      level: LOG_TYPE.WARN.level,
      stdout: true,
    };
    const msg = 'Log message';
    const logMsg = {
      logType: LOG_TYPE.INFO,
      msg,
    };

    // Act
    log(logMsg);

    // Assert
    expect(writeToServer).not.toBeCalled();
  });
  xit('should log and display', () => {
    // Arrange
    env.log = {
      dir: 'dir_name',
      level: LOG_TYPE.WARN.level,
      stdout: true,
    };
    const consoleMock = jest.fn();
    getConsole.mockReturnValue((msg) => consoleMock(msg));
    const formattedMessage = 'formatted_message';
    formatMessage.mockReturnValue(formattedMessage);
    const msg = 'Log message';
    const logMsg = {
      logType: LOG_TYPE.WARN,
      msg,
    };

    // Act
    log(logMsg);

    // Assert
    expect(writeToServer).toBeCalledWith(logMsg);
    expect(getConsole).toBeCalledWith(LOG_TYPE.WARN);
    expect(consoleMock).toBeCalledWith(msg);
  });
  xit('should log and not display', () => {
    // Arrange
    env.log = {
      dir: 'dir_name',
      level: LOG_TYPE.WARN.level,
      stdout: false,
    };
    const consoleMock = jest.fn();
    getConsole.mockReturnValue((msg) => consoleMock(msg));
    const formattedMessage = 'formatted_message';
    formatMessage.mockReturnValue(formattedMessage);
    const msg = 'Log message';
    const logMsg = {
      logType: LOG_TYPE.ERROR,
      msg,
    };

    // Act
    log(logMsg);

    // Assert
    expect(writeToServer).toBeCalledWith(logMsg);
    expect(getConsole).not.toBeCalled();
    expect(consoleMock).not.toBeCalled();
  });
});
