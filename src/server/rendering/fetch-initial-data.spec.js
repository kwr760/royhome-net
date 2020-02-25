import fetchInitialData from './fetch-initial-data';

describe('server/rendering/fetch-initial-data', () => {
  it('should return object with collected data', () => {
    // Arrange
    const data1 = {
      data: 'Test #1',
    };
    const data2 = {
      data: 'Test #2',
    };
    const endpoints = {
      name1: () => (data1),
      name2: () => (data2),
    };
    const expectedResult = {
      name1: data1,
      name2: data2,
    };

    // Act
    const result = fetchInitialData(endpoints);
    // Assert
    expect(result).toEqual(expectedResult);
  });
});
