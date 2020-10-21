import { getParsedUrl } from './get-parsed-url';

describe('client/util/url/get-parsed-url', () => {
  const savedGlobalLocation = global.location;

  beforeEach(() => {
    delete global.location;
    global.location = {
      href: 'https://www.royk.us',
    } as Location;
  });
  afterEach(() => {
    global.location = savedGlobalLocation;
  });
  it('should create an url', () => {
    // Arrange
    const config = {
      url: '/url',
    };
    const action = {
      type: 'type',
      payload: {},
    };
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
      type: 'type',
      payload: {},
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
