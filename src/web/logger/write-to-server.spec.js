import writeToServer from './write-to-server';
import LOG_LEVELS from '../../util/logger/levels';

describe('web/logger/write-to-server', () => {
  const msg = {
    level: LOG_LEVELS.ERROR,
    msg: 'message',
  };

  beforeEach(() => {
    global.fetch = jest.fn();
    global.console.error = jest.fn();
  });
  afterEach(() => {
    global.fetch.mockRestore();
    global.console.error.mockRestore();
  });

  it('should write to the file', async () => {
    // Arrange
    global.fetch.mockImplementation(() => Promise.resolve());
    const expectedUrl = 'http://localhost:3000/api/log';
    const expectedArgs = {
      method: 'PUT',
      body: JSON.stringify(msg),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Act
    await writeToServer(msg);

    // Assert
    expect(fetch).toBeCalledWith(expectedUrl, expectedArgs);
    expect(console.error).not.toHaveBeenCalled();
  });
  it('should throw error on failure', async () => {
    // Arrange
    const error = 'Error message';
    fetch.mockImplementation(() => Promise.reject(new Error(error)));

    // Act
    await writeToServer(msg);

    // Assert
    expect(console.error).toHaveBeenCalledWith(`Logging to server failed: ${error}`);
  });
});
