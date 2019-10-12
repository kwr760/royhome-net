import auth0 from 'auth0-js';
// import env from '../../../config';

const REDIRECT_ON_LOGIN = 'redirect_on_login';
const TOKEN_URL = 'http://royhome.net';

let gAccessToken = null;
let gData = null;
let gExpiresAt = null;

export default class Auth {
  constructor(history) {
    this.history = history;

    const webPort = process.env.WEB_PORT || 7000;
    const webHost = process.env.WEB_HOST || 'http://localhost';
    const webUrl = `${webHost}:${webPort}`;
    const apiPort = process.env.API_PORT || 7001;
    const apiHost = process.env.API_HOST || 'http://localhost';
    const apiUrl = `${apiHost}:${apiPort}`;
    const env = {
      auth0: {
        domain: 'royk.auth0.com',
        clientId: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
        callbackUrl: `${webUrl}/callback`,
        audience: `${apiUrl}`,
      },
    };

    this.auth0 = new auth0.WebAuth({
      domain: env.auth0.domain,
      clientID: env.auth0.clientId,
      redirectUri: env.auth0.callbackUrl,
      audience: env.auth0.audience,
      responseType: 'token id_token',
      scope: 'openid profile email',
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
    gAccessToken = authResult.accessToken;
    gData = authResult.idTokenPayload[TOKEN_URL];
    this.scheduleTokenRenewal();
  };

  isAuthenticated = () => new Date().getTime() < gExpiresAt;

  logout = () => {
    const webPort = process.env.WEB_PORT || 7000;
    const webHost = process.env.WEB_HOST || 'http://localhost';
    const webUrl = `${webHost}:${webPort}`;
    const env = {
      auth0: {
        clientId: 'J5Mu7fSFraTWgQBz1WJgikpnuRnKRkaL',
      },
      web: {
        url: webUrl,
      },
    };
    this.auth0.logout({
      clientID: env.auth0.clientId,
      returnTo: env.web.url,
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
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => cb(profile, err));
  };

  userHasRole = (role) => {
    const grantedRoles = (gData.role || '').split(' ');
    if (gData.role === 'owner') {
      grantedRoles.push('friend', 'engineer', 'family', 'company');
    }
    return grantedRoles.includes(role);
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
