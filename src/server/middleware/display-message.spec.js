import displayMessage from './display-message';
import Logger from '../logger';

describe('server/middleware/display-message', () => {
  xit('should return a status when called', () => {
    // Arrange
    Logger.log = jest.fn();
    const msg = 'This is a test message';

    // Act
    displayMessage(msg);

    // Assert
    expect(Logger.log).toHaveBeenCalledWith(msg);
  });
});
