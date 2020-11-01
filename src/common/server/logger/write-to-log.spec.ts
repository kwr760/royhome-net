import { appendFile } from 'fs';
import { mocked } from 'ts-jest/utils';

import writeToLog from './write-to-log';

jest.mock('fs');

describe('server/logger/write-to-log', () => {
  beforeEach(() => {
    global.console.error = jest.fn();
  });
  afterEach(() => {
    (global.console.error as jest.Mock).mockRestore();
  });
  it('should write to the file', () => {
    // Arrange
    mocked(appendFile).mockImplementation((_f, _m, cb) => {
      cb(null);
    });

    // Act
    writeToLog('filename', 'message');

    // Assert
    expect(appendFile).toBeCalledWith('filename', 'message\n', expect.any(Function));
  });
  it('should throw error on failure', () => {
    // Arrange
    mocked(appendFile).mockImplementation((f, m, cb) => {
      const msg = f + ' - ' + m;
      cb(new Error(msg));
    });

    // Act
    try {
      writeToLog('filename', 'message');
      expect(false).toBe(true);
    } catch (e) {
      expect(e).toEqual(Error('filename - message\n'));
    }
  });
});
