import { getParsedUrl } from './get-parsed-url';

describe('client/util/url/get-parsed-url', () => {
  const savedGlobalLocation = global.location;

  beforeEach(() => {
    delete global.location;
    global.location = new URL('https://www.royk.us');
  });
  afterEach(() => {
    global.location = savedGlobalLocation;
  });
  it('should create an url', () => {
    // Arrange
    const config = {
      url: '/url',
    };
    const action = {};
    const apiUrl = 'https://api.royk.us';

    // Act
    const result = getParsedUrl(config, action, apiUrl);

    // Assert
    expect(result).toEqual(expect.stringMatching(/https:\/\/api.royk.us\/url/));
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
    const apiUrl = 'https://api.royk.us';

    // Act
    const result = getParsedUrl(config, action, apiUrl);

    // Assert
    expect(result).toEqual(expect.stringMatching(/https:\/\/api.royk.us\/url\/fieldData\/fun_stuff\/end/));
  });
});
