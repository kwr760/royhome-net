import { UserActionType } from '../../../types/action.types';
import { UserStateType } from '../../../types/state.types';
import { UserActions } from './user.constants';

export const updateUser = (user: UserStateType): UserActionType => ({
  type: UserActions.UPDATE_USER,
  payload: {
    user,
  },
});
