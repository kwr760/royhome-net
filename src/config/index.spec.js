/* eslint-disable global-require */
describe('config/index', () => {
  const { RELEASE_ENV } = process.env;

  describe('production', () => {
    beforeEach(() => {
      jest.resetModules();
      process.env.RELEASE_ENV = 'prod';
    });

    afterEach(() => {
      process.env.RELEASE_ENV = RELEASE_ENV;
    });

    it('should load prod as expected', () => {
      // Arrange
      const expected = {
        default: {
          appName: 'roy-home',
          auth0: {
            audience: 'http://royk.us',
            callbackUrl: 'https://royk.us/callback',
            clientId: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
            domain: 'royk.auth0.com',
          },
          host: 'https://royk.us',
          mode: 'production',
          root: expect.stringContaining('/royhome-net'),
          server: {
            https: true,
            cert: '/etc/letsencrypt/live/royk.us/cert.pem',
            key: '/etc/letsencrypt/live/royk.us/privkey.pem',
            ca: '/etc/letsencrypt/live/royk.us/chain.pem',
          },
        },
      };

      // Act
      const prod = require('./index');

      // Assert
      expect(prod).toEqual(expected);
    });
  });

  describe('development', () => {
    beforeEach(() => {
      jest.resetModules();
      process.env.RELEASE_ENV = 'dev';
    });

    afterEach(() => {
      process.env.RELEASE_ENV = RELEASE_ENV;
    });

    it('should load dev as expected', () => {
      // Arrange
      const expected = {
        default: {
          appName: 'roy-home',
          auth0: {
            audience: 'http://royk.us',
            callbackUrl: 'http://localhost:3000/callback',
            clientId: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
            domain: 'royk.auth0.com',
          },
          host: 'http://localhost:3000',
          mode: 'development',
          root: expect.stringContaining('/royhome-net'),
          server: {
            https: false,
          },
        },
      };

      // Act
      const dev = require('./index');

      // Assert
      expect(dev).toEqual(expected);
    });
  });
});
