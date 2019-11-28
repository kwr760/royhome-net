import { OWNER, ROLES } from './constants';

const hasNeededRole = (neededRole, data = {}) => {
  const { role: rolesString = '' } = data;

  let grantedRoles = rolesString.split(' ');
  if (grantedRoles.includes(OWNER)) {
    grantedRoles = grantedRoles.concat(Object.values(ROLES));
  }

  return grantedRoles.includes(neededRole);
};

export default hasNeededRole;
