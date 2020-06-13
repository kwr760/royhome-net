// @flow

// import { matchPath } from 'react-router-dom';
import { COOKIE_JWT_PAYLOAD } from '../../util/auth0/auth0.constants';
import getResumeHandler from '../handler/resume/get-resume';

const populateState = async (req: Request) => {
  // const activeRoute = routes.find((route) => matchPath(req.url, route)) || {};
  // const data = fetchInitialData(activeRoute.fetchData ? activeRoute.fetchData : {});
  const jwt = req.cookies[COOKIE_JWT_PAYLOAD] ? JSON.parse(req.cookies[COOKIE_JWT_PAYLOAD]) : {};
  const { exp = 0, user = {} } = jwt;
  const expiresAt = exp * 1000;
  const session = {
    authenticated: (expiresAt > 0),
    expiration: -1,
    isLoading: false,
  };
  const email = 'kroy760@gmail.com';
  const fetchedResume = await getResumeHandler();
  const { body: { resume = {} } = {} } = fetchedResume;

  return {
    session,
    user,
    resume: {
      activeResume: email,
      [email]: resume,
    },
  };
};

export default populateState;
