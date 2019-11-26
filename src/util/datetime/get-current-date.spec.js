import getCurrentDate from './get-current-date';

describe('util/datetime/get-current-date', () => {
  it('should return string prefixed with zero', () => {
    // Arrange
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() => new Date('2000-01-01 00:00:00 PST').valueOf());

    // Act
    const result = getCurrentDate();

    // Assert
    expect(result).toEqual('20000101');
  });
  it('should return string without prefix', () => {
    // Arrange
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() => new Date('2000-10-10 00:00:00 PST').valueOf());

    // Act
    const result = getCurrentDate();

    // Assert
    expect(result).toEqual('20001010');
  });
});
