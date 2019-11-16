import displayMessage from './display-message';
import Logger from '../logger';

describe('server/middleware/display-message', () => {
  it('should return a status when called', () => {
    // Arrange
    Logger.log = jest.fn();
    const msg = 'This is a test message';

    // Ar
    displayMessage(msg)();

    // Assert
    expect(Logger.log).toHaveBeenCalledWith(msg);
  });
});
