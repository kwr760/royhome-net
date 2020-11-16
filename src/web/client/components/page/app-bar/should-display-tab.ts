import hasNeededRole from '../../../../../common/util/auth0/has-needed-role';
import { UserStateType } from '../../../../types/state.types';

export const shouldDisplayTab = (authenticated: boolean, checkRole: string, user: UserStateType): boolean => {
  if (checkRole.length > 0) {
    if (!authenticated || !hasNeededRole(checkRole, user.context)) {
      return false;
    }
  }
  return true;
};
