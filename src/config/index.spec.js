/* eslint-disable global-require */
import LOG_LEVELS from '@common/util/logger/logger-levels';

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
            callbackUrl: 'https://royk.us',
            clientId: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
            domain: 'royk.auth0.com',
          },
          host: 'https://royk.us',
          mode: 'production',
          root: expect.stringContaining('/royhome-net'),
          port: {
            api: 5000,
            web: 3000,
          },
          cert: {
            ca: '/var/cert/royk.us/chain.pem',
            cert: '/var/cert/royk.us/cert.pem',
            key: '/var/cert/royk.us/privkey.pem',
          },
          log: {
            dir: '/var/log/royhome.net',
            level: LOG_LEVELS.WARN,
            stdout: false,
            includePidFilename: true,
          },
          api: {
            url: 'https://api.royk.us',
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
            callbackUrl: 'https://royk.us',
            clientId: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
            domain: 'royk.auth0.com',
          },
          host: 'https://royk.us',
          mode: 'development',
          root: expect.stringContaining('/royhome-net'),
          port: {
            api: 5000,
            web: 3000,
          },
          cert: {
            ca: '/var/cert/royk.us/chain.pem',
            cert: '/var/cert/royk.us/cert.pem',
            key: '/var/cert/royk.us/privkey.pem',
          },
          log: {
            dir: './log',
            level: LOG_LEVELS.DEBUG,
            stdout: true,
            includePidFilename: false,
          },
          api: {
            url: 'https://api.royk.us',
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
