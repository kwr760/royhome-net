// @flow

const CODES = {
  DB_UNEXPECTED_RESULT: 'DB_UNEXPECTED_RESULT',
  DB_INVALID_OBJECT: 'DB_INVALID_OBJECT',
  DB_UNKNOWN_ERROR: 'DB_UNKNOWN_ERROR',
  API_UNAUTHENTICATED: 'API_UNAUTHENTICATED',
};

export const ERROR_CODE = {
  [CODES.DB_UNEXPECTED_RESULT]: {
    code: CODES.DB_UNEXPECTED_RESULT,
    msg: 'Received unexpected data from the data source',
  },
  [CODES.DB_INVALID_OBJECT]: {
    code: CODES.DB_INVALID_OBJECT,
    msg: 'Received an object which is not valid',
  },
  [CODES.DB_UNKNOWN_ERROR]: {
    code: CODES.DB_UNKNOWN_ERROR,
    msg: 'The database promise rejected base on an error',
  },
  [CODES.API_UNAUTHENTICATED]: {
    code: CODES.API_UNAUTHENTICATED,
    msg: 'Not authenticated to make the api call',
  },
};
