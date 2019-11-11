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
            callbackUrl: 'http://45.79.110.249:9200/callback',
            clientId: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
            domain: 'royk.auth0.com',
          },
          host: 'http://45.79.110.249',
          mode: 'production',
          port: 9200,
          root: expect.stringContaining('/royhome-net'),
          url: 'http://45.79.110.249:9200',
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
            callbackUrl: 'http://localhost:9100/callback',
            clientId: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
            domain: 'royk.auth0.com',
          },
          host: 'http://localhost',
          mode: 'development',
          port: 9100,
          root: expect.stringContaining('/royhome-net'),
          url: 'http://localhost:9100',
        },
      };

      // Act
      const dev = require('./index');

      // Assert
      expect(dev).toEqual(expected);
    });
  });
});
