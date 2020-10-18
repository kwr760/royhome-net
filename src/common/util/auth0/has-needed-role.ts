import { OWNER, ROLES } from './role.constants';

interface Context {
  role: string;
}

const hasNeededRole = (neededRole: string, context: Context = { role: '' }): boolean => {
  const { role } = context;

  let grantedRoles = role.split(' ');
  if (grantedRoles.includes(OWNER)) {
    grantedRoles = grantedRoles.concat(Object.values(ROLES));
  }

  return grantedRoles.includes(neededRole);
};

export default hasNeededRole;
