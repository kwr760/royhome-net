import getLogFilename from './get-filename';

describe('server/logger/get-filename', () => {
  it('should return filename with date, pid, etc', () => {
    // Arrange
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() => new Date('2000-01-01T21:01:01.000').valueOf());

    // Act
    const result = getLogFilename('/var/log/roy-home.net');

    // Assert
    expect(result).toMatch(/^\/var\/log\/roy-home.net\/server-20000101-/);
    expect(result).toMatch(/.log$/);
  });
});
