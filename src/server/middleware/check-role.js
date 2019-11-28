import { UNAUTHORIZED } from 'http-status-codes';

import hasNeededRole from '../../util/auth0/has-needed-role';
import { TOKEN_URL } from '../../util/auth0/constants';

const checkRole = (neededRole) => (req, res, next) => {
  const { user: token = {} } = req;
  const { [TOKEN_URL]: data } = token;

  if (hasNeededRole(neededRole, data)) {
    return next();
  }

  return res.sendStatus(UNAUTHORIZED);
};

export default checkRole;
