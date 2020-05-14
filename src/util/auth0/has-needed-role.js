// @flow

import { OWNER, ROLES } from './auth0.constants';
import type { UserContextType } from '../../client/store/user/user.types';

const hasNeededRole = (neededRole: string, context: UserContextType = {}) => {
  const { role: rolesString = '' } = context;

  let grantedRoles = rolesString.split(' ');
  if (grantedRoles.includes(OWNER)) {
    grantedRoles = grantedRoles.concat(Object.values(ROLES));
  }

  return grantedRoles.includes(neededRole);
};

export default hasNeededRole;
