import { UserActions } from './user.constants';
import { UpdateUserActionType, UserStateType } from '../../../types/user.types';

export const updateUser = (user: UserStateType): UpdateUserActionType => ({
  type: UserActions.UPDATE_USER,
  payload: {
    user,
  },
});
