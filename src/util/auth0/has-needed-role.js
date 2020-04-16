// @flow

import { OWNER, ROLES } from './constants';
import type { TokenDataType } from './types';

const hasNeededRole = (neededRole: string, data: TokenDataType = {}) => {
  const { role: rolesString = '' } = data;

  let grantedRoles = rolesString.split(' ');
  if (grantedRoles.includes(OWNER)) {
    grantedRoles = grantedRoles.concat(Object.values(ROLES));
  }

  return grantedRoles.includes(neededRole);
};

export default hasNeededRole;
