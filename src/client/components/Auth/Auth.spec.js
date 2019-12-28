import Auth from './Auth';
import Logger from '../../logger';

jest.mock('auth0-js');

describe('client/components/Pages/Nav', () => {
  let history;

  beforeEach(() => {
    Logger.error = jest.fn();
    global.setTimeout = jest.fn();
    global.Date.now = jest.fn(() => -1);
    history = [];
  });

  afterEach(() => {
    Logger.error.mockRestore();
    global.setTimeout.mockRestore();
    global.Date.now.mockRestore();
  });

  it('constructor', () => {
    // Arrange/Act
    const test = new Auth(history);

    // Assert
    expect(test.auth0).not.toBeNull();
    expect(test.history).toEqual(history);
  });
  it('login', () => {
    // Arrange
    const test = new Auth(history);

    // Act
    test.login();

    // Assert
    expect(test.auth0.authorize).toBeCalled();
  });
  it('handleAuthentication', () => {
    // Arrange
    const test = new Auth(history);

    // Act
    test.handleAuthentication();

    // Assert
    expect(test.auth0.parseHash).toBeCalled();
  });
  it('useHashToSetSession - authResult', () => {
    // Arrange
    const test = new Auth(['/']);

    // Act
    test.useHashToSetSession('', {
      accessToken: 'AccessToken',
      idToken: 'IdToken',
      idTokenPayload: {
        'http://royhome.net': 'DATA',
      },
    });

    // Assert
    expect(test.history).toContain('/');
  });
  it('useHashToSetSession - authResult - localstorage', () => {
    // Arrange
    const test = new Auth(history);
    localStorage.setItem('redirect_on_login', JSON.stringify('/redirect'));

    // Act
    test.useHashToSetSession('', {
      accessToken: 'AccessToken',
      idToken: 'IdToken',
      idTokenPayload: {
        'http://royhome.net': 'DATA',
      },
    });

    // Assert
    expect(test.history).toContain('/redirect');
  });
  it('useHashToSetSession - error', () => {
    // Arrange
    const err = { message: 'There was an error' };
    const test = new Auth(history);

    // Act
    test.useHashToSetSession(err);

    // Assert
    expect(Logger.error).toBeCalledWith(err.message);
    expect(test.history).toContain('/');
  });
  it('useHashToSetSession - error - do not push', () => {
    // Arrange
    const err = { message: 'There was an error' };
    const test = new Auth(['/']);

    // Act
    test.useHashToSetSession(err);

    // Assert
    expect(Logger.error).toBeCalledWith(err.message);
    expect(test.history).toContain('/');
  });
  it('useHashToSetSession - no arguments', () => {
    // Arrange
    const test = new Auth(history);

    // Act
    test.useHashToSetSession();

    // Assert
    expect(Logger.error).not.toBeCalled();
    expect(test.history).toEqual([]);
  });
  it('setSession', () => {
    // Arrange
    const test = new Auth(history);
    test.scheduleTokenRenewal = jest.fn();

    // Act
    test.setSession({
      expiresIn: 0,
      accessToken: expect.anything(),
      idTokenPayload: {
        load: 'payload',
      },
    });

    // Assert
    expect(test.scheduleTokenRenewal).toBeCalled();
  });
  it('isAuthenticated', () => {
    // Arrange
    const test = new Auth(history);

    // Act
    const result = test.isAuthenticated();

    // Assert
    expect(result).toBe(false);
  });
  it('logout', () => {
    // Arrange
    const test = new Auth(history);

    // Act
    test.logout();

    // Assert
    expect(test.auth0.logout).toBeCalled();
    expect(test.auth0.logout).toBeCalledWith({
      clientID: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
      returnTo: 'http://localhost:3001',
    });
  });
  it('getAccessToken', () => {
    // Arrange
    const test = new Auth(history);
    test.accessToken = 'AccessToken';

    // Act
    const token = test.getAccessToken();

    // Assert
    expect(token).not.toBeNull();
  });
  it('getAccessToken - throws Error', () => {
    // Arrange
    const test = new Auth(history);

    // Act/Assert
    try {
      test.getAccessToken();
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toMatch('No access token found.');
    }
  });
  it('getProfile', () => {
    // Arrange
    const test = new Auth(history);
    test.accessToken = 'AccessToken';
    const callback = jest.fn(() => {});
    const err = 'Error message';
    const profile = {
      name: 'Name',
    };
    const userInfo = jest.fn((str, cb) => {
      cb(err, profile);
    });
    test.auth0.client = {
      userInfo,
    };

    // Act
    test.getProfile(callback);

    // Assert
    expect(test.auth0.client.userInfo).toBeCalledWith('AccessToken', expect.any(Function));
    expect(callback).toBeCalledWith(profile, err);
  });
  it('userHasRole - returns false', () => {
    // Arrange
    const test = new Auth(history);

    // Act
    const result = test.userHasRole('engineer');

    // Assert
    expect(result).toBe(false);
  });
  it('userHasRole - is owner returns true', () => {
    // Arrange
    const test = new Auth(history);
    test.data = {
      role: 'owner',
    };

    // Act
    const result = test.userHasRole('engineer');

    // Assert
    expect(result).toBe(true);
  });
  it('renewToken - resulting in known error', () => {
    // Arrange
    const test = new Auth(history);
    test.setSession = jest.fn();

    const callback = jest.fn();
    const err = { error: 'login_required', error_description: 'There was an error' };
    const result = {};
    test.auth0.checkSession = jest.fn((obj, cb) => {
      cb(err, result);
    });

    // Act
    test.renewToken(callback);

    // Assert
    expect(test.auth0.checkSession).toBeCalled();
    expect(Logger.error).not.toBeCalledWith(`Error: ${err.error} - ${err.error_description}.`);
    expect(callback).toBeCalledWith(err, result);
    expect(test.setSession).not.toBeCalled();
  });
  it('renewToken - resulting in error', () => {
    // Arrange
    const test = new Auth(history);
    test.setSession = jest.fn();

    const callback = jest.fn();
    const err = { error: 500, error_description: 'There was an error' };
    const result = {};
    test.auth0.checkSession = jest.fn((obj, cb) => {
      cb(err, result);
    });

    // Act
    test.renewToken(callback);

    // Assert
    expect(test.auth0.checkSession).toBeCalled();
    expect(Logger.error).toBeCalledWith(`Error: ${err.error} - ${err.error_description}.`);
    expect(callback).toBeCalledWith(err, result);
    expect(test.setSession).not.toBeCalled();
  });
  it('renewToken - success', () => {
    // Arrange
    const test = new Auth(history);
    test.setSession = jest.fn();
    const callback = undefined;
    const err = undefined;
    const result = {
      obj: 'test',
    };
    test.auth0.checkSession = jest.fn((obj, cb) => {
      cb(err, result);
    });

    // Act
    test.renewToken(callback);

    // Assert
    expect(test.auth0.checkSession).toBeCalled();
    expect(Logger.error).not.toBeCalled();
    expect(test.setSession).toBeCalledWith(result);
  });
  it('scheduleTokenRenewal', () => {
    // Arrange
    const test = new Auth(history);

    // Act
    test.scheduleTokenRenewal();

    // Assert
    expect(setTimeout).toBeCalled();
  });
});
