// @flow

import ObjectMapper from 'object-mapper';
import { ERROR_CODE } from '../../../util/error-codes';

const addressMap = {
  address: 'address',
};

const ownerMap = {
  name: 'name',
};

const contactMap = {
  phone: 'phone',
  email: 'email',
  display_phone: 'displayPhone',
};

const summaryMap = {
  summary: 'summary',
};

const educationMap = {
  degree: 'degree',
  school: 'school',
  graduation_date: 'graduationDate',
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

export const resumeSummaryMapper = (src: Array<string>) => {
  if (src.length !== 1) {
    throw ERROR_CODE.DB_UNEXPECTED_RESULT;
  }

  return ObjectMapper(src, summaryMap);
};

export const resumeEducationMapper = (src: Array<string>) => {
  const mappedItems = [];
  if (src.length <= 0) {
    throw ERROR_CODE.DB_UNEXPECTED_RESULT;
  }

  src.forEach((item) => {
    mappedItems.push(ObjectMapper(item, educationMap));
  });
  return mappedItems;
};
