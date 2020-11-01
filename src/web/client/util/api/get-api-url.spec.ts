import { getApiUrl } from './get-api-url';

describe('client/util/url/get-browser-url-info', () => {
  const savedGlobalLocation = global.location;

  afterEach(() => {
    global.location = savedGlobalLocation;
  });
  it('should create an url', () => {
    // Arrange
    const expected = 'https://api.royk.us';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete global.location;
    global.location = {
      host: 'www.royk.us',
      protocol: 'https:',
      href: 'https://www.royk.us',
    } as Location;

    // Act
    const result = getApiUrl();

    // Assert
    expect(result).toEqual(expected);
  });
});
