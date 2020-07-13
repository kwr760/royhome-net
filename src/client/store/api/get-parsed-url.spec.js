import { getParsedUrl } from './get-parsed-url';

describe('client/store/api/get-parsed-url', () => {
  it('should create an url', () => {
    // Arrange
    const config = {
      url: '/url',
    };
    const action = {};

    // Act
    const result = getParsedUrl(config, action);

    // Assert
    expect(result).toEqual(expect.stringMatching(/\/api\/url/));
  });
  it('should parse params into an url', () => {
    // Arrange
    const config = {
      url: '/url/{field}/{extra}/end',
    };
    const action = {
      params: {
        field: 'fieldData',
        extra: 'fun_stuff',
      },
    };

    // Act
    const result = getParsedUrl(config, action);

    // Assert
    expect(result).toEqual(expect.stringMatching(/\/api\/url\/fieldData\/fun_stuff\/end/));
  });
});
