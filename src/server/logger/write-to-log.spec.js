import fs from 'fs';
import writeToLog from './write-to-log';

describe('server/logger/write-to-log', () => {
  it('should write to the file', () => {
    // Arrange
    fs.appendFile = jest.fn();

    // Act
    writeToLog('filename', 'message');

    // Assert
    expect(fs.appendFile).toBeCalledWith('filename', 'message', expect.any(Function));
  });
  it('should throw error on failure', () => {
    // Arrange
    fs.appendFile = jest.fn((f, m, cb) => {
      cb(new Error('Error'));
    });

    // Act
    try {
      writeToLog('filename', 'message');
      expect(false).toBe(true);
    } catch (e) {
      expect(e).toEqual(Error('Error'));
    }
  });
});
