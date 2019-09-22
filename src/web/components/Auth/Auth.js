import auth0 from 'auth0-js';

const REDIRECT_ON_LOGIN = 'redirect_on_login';

// let gIdToken = null;
let gAccessToken = null;
let gScopes = null;
let gExpiresAt = null;

export default class Auth {
  constructor(history) {
    this.history = history;
    this.userProfile = null;
    this.requestedScopes = 'openid profile email read:courses';
    const domain = process.env.AUTH0_DOMAIN ? process.env.AUTH0_DOMAIN : 'royk.auth0.com';
    const clientID = process.env.AUTH0_CLIENT_ID ? process.env.AUTH0_CLIENT_ID : 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL';
    const redirectUri = process.env.AUTH0_CALLBACK_URL ? process.env.AUTH0_CALLBACK_URL : 'http://localhost:7000/callback';
    const audience = process.env.AUTH0_AUDIENCE ? process.env.AUTH0_AUDIENCE : 'http://localhost:7001';

    this.auth0 = new auth0.WebAuth({
      domain,
      clientID,
      redirectUri,
      audience,
      responseType: 'token id_token',
      scope: this.requestedScopes,
    });
  }

  login = () => {
    this.auth0.authorize();
    localStorage.setItem(
      REDIRECT_ON_LOGIN,
      JSON.stringify(this.history.location)
    );
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        const redirectLocation = localStorage.getItem(REDIRECT_ON_LOGIN) === 'undefined' ? '/' : JSON.parse(localStorage.getItem(REDIRECT_ON_LOGIN));
        this.history.push(redirectLocation);
      } else if (err) {
        this.history.push('/');
        console.log(err);
      }
      localStorage.removeItem(REDIRECT_ON_LOGIN);
    });
  };

  setSession = (authResult) => {
    gExpiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    gScopes = authResult.scope || this.requestedScopes || '';
    gAccessToken = authResult.accessToken;
    // gIdToken = authResult.idToken;
    this.scheduleTokenRenewal();
  };

  isAuthenticated = () => new Date().getTime() < gExpiresAt;

  logout = () => {
    gAccessToken = null;
    // gIdToken = null;
    gExpiresAt = null;
    gScopes = null;
    this.auth0.logout({
      clientID: process.env.AUTH0_CLIENT_ID,
      returnTo: 'http://localhost:7000',
    });
  };

  getAccessToken = () => {
    if (!gAccessToken) {
      throw new Error('No access token found.');
    }
    return gAccessToken;
  };

  // eslint-disable-next-line consistent-return
  getProfile = (cb) => {
    if (this.userProfile) {
      return cb(this.userProfile);
    }
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      return cb(profile, err);
    });
  };

  userHasScopes = (scopes) => {
    const grantedScopes = (gScopes || '').split(' ');
    return scopes.every((scope) => grantedScopes.includes(scope));
  };

  renewToken(cb) {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(`Error: ${err.error} - ${err.error_description}.`);
      } else {
        this.setSession(result);
      }
      if (cb) {
        cb(err, result);
      }
    });
  }

  scheduleTokenRenewal() {
    const delay = gExpiresAt - Date.now();
    if (delay > 0) {
      setTimeout(() => this.renewToken(), delay);
    }
  }
}
