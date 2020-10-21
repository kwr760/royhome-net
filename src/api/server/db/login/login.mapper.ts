import { merge } from 'object-mapper';
import { LoginType } from '../../../../types/login.types';
import { ERROR_CODE } from '../../../util/error-codes';

const loginMap = {
  id: 'id',
  user_id: 'userId',
  email: 'email',
};

export const loginMapper = (src: unknown[]): LoginType => {
  if (src.length !== 1) {
    throw ERROR_CODE.DB_UNEXPECTED_RESULT;
  }

  return merge(src, loginMap) as LoginType;
};
