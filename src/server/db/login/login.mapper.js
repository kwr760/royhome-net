// @flow

import ObjectMapper from 'object-mapper';
import { ERROR_CODE } from '../../../util/error-codes';

const loginMap = {
  id: 'id',
  user_id: 'userId',
  email: 'email',
};

export const loginMapper = (src: Array<string>) => {
  if (src.length !== 1) {
    throw ERROR_CODE.DB_UNEXPECTED_RESULT;
  }

  return ObjectMapper(src, loginMap);
};
