import auth0 from 'auth0-js';

import env from '../../../config';
import hasNeededRole from '../../../util/auth0/has-needed-role';
import { TOKEN_URL } from '../../../util/auth0/constants';
import Logger from '../../logger';

const REDIRECT_ON_LOGIN = 'redirect_on_login';

export default class Auth {
  accessToken = null;

  data = {};

  expiresAt = null;

  constructor(history) {
    this.history = history;

    const webConfig = {
      domain: env.auth0.domain,
      clientID: env.auth0.clientId,
      redirectUri: env.auth0.callbackUrl,
      audience: env.auth0.audience,
      responseType: 'token id_token',
      scope: 'openid profile email',
    };

    this.auth0 = new auth0.WebAuth(webConfig);
  }

  login = () => {
    this.auth0.authorize();
    localStorage.setItem(
      REDIRECT_ON_LOGIN,
      JSON.stringify(this.history.location),
    );
  };

  useHashToSetSession = (err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      this.setSession(authResult);
      const redirectLocation = localStorage.getItem(REDIRECT_ON_LOGIN) === 'undefined' ? '/' : JSON.parse(localStorage.getItem(REDIRECT_ON_LOGIN));
      if (!this.history.includes(redirectLocation)) {
        this.history.push(redirectLocation);
      }
    } else if (err) {
      if (!this.history.includes('/')) {
        this.history.push('/');
      }
      Logger.error(err.message);
    }
    localStorage.removeItem(REDIRECT_ON_LOGIN);
  };

  handleAuthentication = () => {
    this.auth0.parseHash(this.useHashToSetSession);
  };

  setSession = (authResult) => {
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.data = authResult.idTokenPayload[TOKEN_URL];
    this.scheduleTokenRenewal();
  };

  isAuthenticated = () => {
    const currTime = new Date().getTime();
    return currTime < this.expiresAt;
  };

  logout = () => {
    this.auth0.logout({
      clientID: env.auth0.clientId,
      returnTo: env.host,
    });
  };

  getAccessToken = () => {
    if (!this.accessToken) {
      throw new Error('No access token found.');
    }
    return this.accessToken;
  };

  getProfile = (cb) => {
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => cb(profile, err));
  };

  userHasRole = (role) => hasNeededRole(role, this.data);

  renewToken = (cb) => {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        Logger.error(`Error: ${err.error} - ${err.error_description}.`);
      } else {
        this.setSession(result);
      }
      if (cb) {
        cb(err, result);
      }
    });
  }

  scheduleTokenRenewal = () => {
    const delay = this.expiresAt - Date.now();
    if (delay > 0) {
      setTimeout(this.renewToken, delay);
    }
  }
}
