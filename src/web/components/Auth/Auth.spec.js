import Auth from './Auth';

jest.mock('auth0-js');

describe('web/components/Pages/Nav', () => {
  let history;

  beforeEach(() => {
    global.setTimeout = jest.fn();
    global.console.log = jest.fn();
    global.Date.now = jest.fn(() => -1);
    history = [];
  });

  afterEach(() => {
    global.setTimeout.mockRestore();
    global.console.log.mockRestore();
    global.Date.now.mockRestore();
  });

  it('constructor', () => {
    // Arrange/Act
    const testAuth = new Auth(history);

    // Assert
    expect(testAuth.auth0).not.toBeNull();
    expect(testAuth.history).toEqual(history);
  });
  it('login', () => {
    // Arrange
    const testAuth = new Auth(history);

    // Act
    testAuth.login();

    // Assert
    expect(testAuth.auth0.authorize).toBeCalled();
  });
  it('handleAuthentication', () => {
    // Arrange
    const testAuth = new Auth(history);

    // Act
    testAuth.handleAuthentication();

    // Assert
    expect(testAuth.auth0.parseHash).toBeCalled();
  });
  it('useHashToSetSession - authResult', () => {
    // Arrange
    const testAuth = new Auth(history);

    // Act
    testAuth.useHashToSetSession('', {
      accessToken: 'AccessToken',
      idToken: 'IdToken',
      idTokenPayload: {
        'http://royhome.net': 'DATA',
      },
    });

    // Assert
    expect(testAuth.history).toContain('/');
  });
  it('useHashToSetSession - authResult - localstorage', () => {
    // Arrange
    const testAuth = new Auth(history);
    localStorage.setItem('redirect_on_login', JSON.stringify('/redirect'));

    // Act
    testAuth.useHashToSetSession('', {
      accessToken: 'AccessToken',
      idToken: 'IdToken',
      idTokenPayload: {
        'http://royhome.net': 'DATA',
      },
    });

    // Assert
    expect(testAuth.history).toContain('/redirect');
  });
  it('useHashToSetSession - error', () => {
    // Arrange
    const testAuth = new Auth(history);

    // Act
    testAuth.useHashToSetSession('There was an error');

    // Assert
    expect(console.log).toBeCalledWith('There was an error');
    expect(testAuth.history).toContain('/');
  });
  it('setSession', () => {
    // Arrange
    const testAuth = new Auth(history);
    testAuth.scheduleTokenRenewal = jest.fn();

    // Act
    testAuth.setSession({
      expiresIn: 0,
      accessToken: expect.anything(),
      idTokenPayload: {
        load: 'payload',
      },
    });

    // Assert
    expect(testAuth.scheduleTokenRenewal).toBeCalled();
  });
  it('isAuthenticated', () => {
    // Arrange
    const testAuth = new Auth(history);

    // Act
    const result = testAuth.isAuthenticated();

    // Assert
    expect(result).toBe(false);
  });
  it('logout', () => {
    // Arrange
    const testAuth = new Auth(history);

    // Act
    testAuth.logout();

    // Assert
    expect(testAuth.auth0.logout).toBeCalled();
    expect(testAuth.auth0.logout).toBeCalledWith({
      clientID: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
      returnTo: 'http://localhost:9100',
    });
  });
  it('getAccessToken', () => {
    // Arrange
    const testAuth = new Auth(history);
    testAuth.accessToken = 'AccessToken';

    // Act
    const token = testAuth.getAccessToken();

    // Assert
    expect(token).not.toBeNull();
  });
  it('getAccessToken - throws Error', () => {
    // Arrange
    const testAuth = new Auth(history);

    // Act/Assert
    try {
      testAuth.getAccessToken();
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toMatch('No access token found.');
    }
  });
  it('getProfile', () => {
    // Arrange
    const testAuth = new Auth(history);
    testAuth.accessToken = 'AccessToken';
    const cb = () => {};
    testAuth.auth0.client = {
      userInfo: jest.fn(),
    };

    // Act
    testAuth.getProfile(cb);

    // Assert
    expect(testAuth.auth0.client.userInfo).toBeCalled();
  });
  it('userHasRole - returns false', () => {
    // Arrange
    const testAuth = new Auth(history);

    // Act
    const result = testAuth.userHasRole('engineer');

    // Assert
    expect(result).toBe(false);
  });
  it('userHasRole - is owner returns true', () => {
    // Arrange
    const testAuth = new Auth(history);
    testAuth.data = {
      role: 'owner',
    };

    // Act
    const result = testAuth.userHasRole('engineer');

    // Assert
    expect(result).toBe(true);
  });
  it('renewToken', () => {
    // Arrange
    const testAuth = new Auth(history);
    const cb = () => {};

    // Act
    testAuth.renewToken(cb);

    // Assert
    expect(testAuth.auth0.checkSession).toBeCalled();
  });
  it('scheduleTokenRenewal', () => {
    // Arrange
    const testAuth = new Auth(history);

    // Act
    testAuth.scheduleTokenRenewal();

    // Assert
    expect(setTimeout).toBeCalled();
  });
});
