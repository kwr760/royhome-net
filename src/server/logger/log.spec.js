import env from '../../config';

import LOG_TYPE from '../../util/logger/levels';

import formatMessage from '../../util/logger/format-message';
import getConsole from '../../util/logger/get-console';

import log from './log';
import writeToLog from './write-to-log';
import getLogFilename from './get-filename';

jest.mock('../../util/logger/format-message');
jest.mock('./get-filename');
jest.mock('./write-to-log');
jest.mock('../../util/logger/get-console');

describe('server/logger/log', () => {
  afterEach(() => {
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
    expect(writeToLog).not.toBeCalled();
  });
  xit('should log and display', () => {
    // Arrange
    env.log = {
      dir: 'dir_name',
      level: LOG_TYPE.WARN,
      stdout: true,
    };
    const consoleMock = jest.fn();
    getConsole.mockReturnValue((msg) => consoleMock(msg));
    const formattedMessage = 'formatted_message';
    formatMessage.mockReturnValue(formattedMessage);
    const logFilename = 'log_filename';
    getLogFilename.mockReturnValue(logFilename);
    const msg = 'Log message';
    const logMsg = {
      logType: LOG_TYPE.WARN,
      msg,
    };

    // Act
    log(logMsg);

    // Assert
    expect(writeToLog).toBeCalledWith(logFilename, formattedMessage);
    expect(getConsole).toBeCalledWith(LOG_TYPE.WARN);
    expect(consoleMock).toBeCalledWith(formattedMessage);
  });
  xit('should log and not display', () => {
    // Arrange
    env.log = {
      dir: 'dir_name',
      level: LOG_TYPE.WARN,
      stdout: false,
    };
    const consoleMock = jest.fn();
    getConsole.mockReturnValue((msg) => consoleMock(msg));
    const formattedMessage = 'formatted_message';
    formatMessage.mockReturnValue(formattedMessage);
    const logFilename = 'log_filename';
    getLogFilename.mockReturnValue(logFilename);
    const msg = 'Log message';
    const logMsg = {
      logType: LOG_TYPE.ERROR,
      msg,
    };

    // Act
    log(logMsg);

    // Assert
    expect(writeToLog).toBeCalledWith(logFilename, formattedMessage);
    expect(getConsole).not.toBeCalled();
    expect(consoleMock).not.toBeCalled();
  });
});
