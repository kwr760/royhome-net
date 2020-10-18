import getCurrentDatetime from './get-current-datetime';

describe('util/datetime/get-current-date', () => {
  it('should return string prefixed with zero', () => {
    // Arrange
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() => new Date('2000-01-01T00:00:00.000').valueOf());

    // Act
    const result = getCurrentDatetime();

    // Assert
    expect(result).toEqual('2000-01-01_00:00:00.000');
  });
  it('should return string without prefix', () => {
    // Arrange
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() => new Date('2000-10-10T10:10:10.100').valueOf());

    // Act
    const result = getCurrentDatetime();

    // Assert
    expect(result).toEqual('2000-10-10_10:10:10.100');
  });
});
