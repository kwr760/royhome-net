import env from '../../config';

import LOG_LEVELS from '../../util/logger/levels';

import env from '../../config';
import log from './log';

import getConsole from '../../util/logger/get-console';
import writeToLog from './write-to-log';
import formatMessage from '../../util/logger/format-message';
import getLogFilename from './get-filename';

jest.mock('../../util/logger/format-message');
jest.mock('./get-filename');
jest.mock('./write-to-log');
jest.mock('../../util/logger/get-console');

describe('server/logger/log', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not log anything', () => {
    // Arrange
    env.log = {
      dir: 'dir_name',
      level: LOG_LEVELS.WARN,
      stdout: true,
    };
    const msg = 'Log message';
    const logMsg = {
      level: LOG_LEVELS.INFO,
      msg,
    };

    // Act
    log(logMsg);

    // Assert
    expect(writeToLog).not.toBeCalled();
  });
  it('should log and display', () => {
    // Arrange
    env.log = {
      dir: 'dir_name',
      level: LOG_LEVELS.WARN,
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
      level: LOG_LEVELS.WARN,
      msg,
    };

    // Act
    log(logMsg);

    // Assert
    expect(writeToLog).toBeCalledWith(logFilename, formattedMessage);
    expect(getConsole).toBeCalledWith(LOG_LEVELS.WARN);
    expect(consoleMock).toBeCalledWith(formattedMessage);
  });
  it('should log and not display', () => {
    // Arrange
    env.log = {
      dir: 'dir_name',
      level: LOG_LEVELS.WARN,
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
      level: LOG_LEVELS.ERROR,
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
