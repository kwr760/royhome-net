import { OWNER, ROLES } from './role.constants';
import { ContextType } from '../../../types/context.types';

const hasNeededRole = (neededRole: string, context: ContextType = { role: '' }): boolean => {
  const { role } = context;

  let grantedRoles = role.split(' ');
  if (grantedRoles.includes(OWNER)) {
    grantedRoles = grantedRoles.concat(Object.values(ROLES));
  }

  return grantedRoles.includes(neededRole);
};

export default hasNeededRole;
