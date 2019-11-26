import fs from 'fs';
import setup from './setup';

describe('server/logger/setup', () => {
  beforeEach(() => {
    fs.existsSync = jest.fn();
    fs.mkdirSync = jest.fn();
  });
  afterEach(() => {
    fs.existsSync.mockRestore();
    fs.mkdirSync.mockRestore();
  });

  it('should check for existence of log dir', () => {
    // Arrange
    fs.existsSync.mockImplementation(() => true);

    // Act
    setup();

    // Assert
    expect(fs.existsSync).toBeCalledWith(expect.stringMatching(/\/log/));
  });
  it('should mkdir dir is needed', () => {
    // Arrange
    fs.existsSync.mockImplementation(() => false);

    // Act
    setup();

    // Assert
    expect(fs.existsSync).toBeCalledWith(expect.stringMatching(/\/log/));
    expect(fs.mkdirSync).toBeCalledWith(expect.stringMatching(/\/log/), { recursive: true });
  });
});
