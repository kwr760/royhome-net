import fs from 'fs';
import setup from './setup';

describe('server/logger/setup', () => {
  it('should check for existence of log dir', () => {
    // Arrange
    fs.existsSync = jest.fn(() => true);

    // Act
    setup();

    // Assert
    expect(fs.existsSync).toBeCalledWith(expect.stringMatching(/\/log/));
  });
  it('should mkdir dir is needed', () => {
    // Arrange
    fs.existsSync = jest.fn(() => false);
    fs.mkdirSync = jest.fn();

    // Act
    setup();

    // Assert
    expect(fs.existsSync).toBeCalledWith(expect.stringMatching(/\/log/));
    expect(fs.mkdirSync).toBeCalledWith(expect.stringMatching(/\/log/), { recursive: true });
  });
});
