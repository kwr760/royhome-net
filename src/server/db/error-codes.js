// @flow

export const ERROR_CODE = {
  DB_UNEXPECTED_RESULT: {
    code: 'DB_UNEXPECTED_RESULT',
    message: 'Received unexpected data from the data source',
  },
  DB_INVALID_OBJECT: {
    code: 'DB_INVALIDATE_OBJECT',
    message: 'Received an object which is not valid',
  },
  DB_UNKNOWN_ERROR: {
    code: 'DB_UNKNOWN_ERROR',
    message: 'The database promise rejected base on an error',
  },
};
