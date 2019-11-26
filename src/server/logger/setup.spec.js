import fs from 'fs';
import setup from './setup';

describe('server/logger/setup', () => {
  beforeEach(() => {
    fs.access = jest.fn();
    fs.mkdir = jest.fn();
  });
  afterEach(() => {
    fs.access.mockRestore();
    fs.mkdir.mockRestore();
  });

  it('should check for existence of log dir', () => {
    // Arrange
    fs.access.mockImplementation((file, options, cb) => { cb(); });

    // Act
    setup();

    // Assert
    expect(fs.access).toBeCalledWith(expect.stringMatching(/\/log$/), 0, expect.any(Function));
    expect(fs.mkdir).not.toBeCalled();
  });
  it('should mkdir dir is needed', () => {
    // Arrange
    fs.access.mockImplementation((file, options, cb) => { cb('not found'); });

    // Act
    setup();

    // Assert
    expect(fs.access).toBeCalledWith(expect.stringMatching(/\/log$/), 0, expect.any(Function));
    expect(fs.mkdir).toBeCalledWith(expect.stringMatching(/\/log$/), { recursive: true });
  });
});
