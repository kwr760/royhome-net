import Logger from './index';

describe('server/logger/index', () => {
  beforeEach(() => {
    global.console.log = jest.fn();
    global.console.warn = jest.fn();
    global.console.error = jest.fn();
  });

  afterEach(() => {
    global.console.log.mockRestore();
    global.console.warn.mockRestore();
    global.console.error.mockRestore();
  });

  it('Logger.log', () => {
    // Arrange
    const msg = 'This is a log';

    // Arrange/Act
    Logger.log(msg);

    // Assert
    expect(console.log).toBeCalledWith(msg);
  });

  it('Logger.warn', () => {
    // Arrange
    const msg = 'This is a warning';

    // Arrange/Act
    Logger.warning(msg);

    // Assert
    expect(console.warn).toBeCalledWith(msg);
  });

  it('Logger.error', () => {
    // Arrange
    const msg = 'This is a error';

    // Arrange/Act
    Logger.error(msg);

    // Assert
    expect(console.error).toBeCalledWith(msg);
  });
});
