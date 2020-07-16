// @flow

import { UNAUTHORIZED } from 'http-status-codes';

import hasNeededRole from '@src/util/auth0/has-needed-role';
import { TOKEN_URL } from '@src/util/auth0/auth0.constants';

const checkRole = (neededRole: string) => (req: Request, res: Response, next: Function) => {
  const { user: token = {} } = req;
  const { [TOKEN_URL]: context } = token;

  if (hasNeededRole(neededRole, context)) {
    return next();
  }

  return res.sendStatus(UNAUTHORIZED);
};

export default checkRole;
