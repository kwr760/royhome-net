import axios from 'axios';

import LOG_LEVELS from '@common/util/logger/logger-levels';
import writeToServer from './write-to-server';

jest.mock('axios', () => ({
  put: jest.fn().mockResolvedValue({ data: {} }),
}));

describe('client/logger/write-to-server', () => {
  const msg = {
    logType: LOG_LEVELS.ERROR,
    msg: 'message',
  };

  beforeEach(() => {
    global.console.error = jest.fn();
  });
  afterEach(() => {
    global.console.error.mockRestore();
  });

  it('should write to the file', async () => {
    // Arrange
    axios.put.mockResolvedValueOnce();
    const expectedUrl = expect.stringMatching(/\/api.localhost\/log/);
    const expectedOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Act
    await writeToServer(msg);

    // Assert
    expect(axios.put).toBeCalledWith(expectedUrl, msg, expectedOptions);
    expect(console.error).not.toHaveBeenCalled();
  });
  it('should throw error on failure', async () => {
    // Arrange
    const error = 'Error message';
    axios.put.mockRejectedValueOnce(new Error(error));

    // Act
    await writeToServer(msg);

    // Assert
    expect(console.error).toHaveBeenCalledWith(`Logging to server failed: ${error}`);
  });
});
