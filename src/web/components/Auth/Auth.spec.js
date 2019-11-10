import Auth from './Auth';

jest.mock('auth0-js');

describe('web/components/Pages/Nav', () => {
  const history = {
    history: 'history',
  };
  beforeEach(() => {
    global.setTimeout = jest.fn();
    global.Date.now = jest.fn(() => -1);
  });

  afterEach(() => {
    global.setTimeout.mockRestore();
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

    // Act
    const token = testAuth.getAccessToken();

    // Assert
    expect(token).not.toBeNull();
  });
  it('getProfile', () => {
    // Arrange
    const testAuth = new Auth(history);
    const cb = () => {};
    testAuth.auth0.client = {
      userInfo: jest.fn(),
    };

    // Act
    testAuth.getProfile(cb);

    // Assert
    expect(testAuth.auth0.client.userInfo).toBeCalled();
  });
  it('userHasRole', () => {
    // Arrange
    const testAuth = new Auth(history);

    // Act
    const result = testAuth.userHasRole('role');

    // Assert
    expect(result).toBe(false);
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
