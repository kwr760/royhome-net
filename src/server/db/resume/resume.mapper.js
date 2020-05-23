// @flow

import ObjectMapper from 'object-mapper';
import { ERROR_CODE } from '../../../util/error-codes';

const addressMap = {
  // id: 'id',
  // user_id: 'userId',
  address: 'address',
};

const ownerMap = {
  // id: 'id',
  // user_id: 'userId',
  name: 'name',
};

const contactMap = {
  // id: 'id',
  // user_id: 'userId',
  phone: 'phone',
  email: 'email',
  display_phone: 'displayPhone',
};

export const resumeAddressMapper = (src: Array<string>) => {
  if (src.length !== 1) {
    throw ERROR_CODE.DB_UNEXPECTED_RESULT;
  }

  return ObjectMapper(src, addressMap);
};

export const resumeOwnerMapper = (src: Array<string>) => {
  if (src.length !== 1) {
    throw ERROR_CODE.DB_UNEXPECTED_RESULT;
  }

  return ObjectMapper(src, ownerMap);
};

export const resumeContactMapper = (src: Array<string>) => {
  if (src.length !== 1) {
    throw ERROR_CODE.DB_UNEXPECTED_RESULT;
  }

  return ObjectMapper(src, contactMap);
};
