import axios from 'axios';

import writeToServer from './write-to-server';
import LOG_LEVELS from '../../util/logger/levels';

jest.mock('axios', () => ({
  put: jest.fn().mockResolvedValue({ data: {} }),
}));

describe('client/logger/write-to-server', () => {
  const msg = {
    level: LOG_LEVELS.ERROR,
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
    const expectedUrl = 'http://localhost:3000/api/log';
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
