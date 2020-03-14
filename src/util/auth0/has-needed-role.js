// @flow

import { OWNER, ROLES } from './constants';
import { TokenData } from './types';

const hasNeededRole = (neededRole: string, data: TokenData = {}) => {
  const { role: rolesString = '' } = data;

  let grantedRoles = rolesString.split(' ');
  if (grantedRoles.includes(OWNER)) {
    grantedRoles = grantedRoles.concat(Object.values(ROLES));
  }

  return grantedRoles.includes(neededRole);
};

export default hasNeededRole;
