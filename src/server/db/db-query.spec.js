import { processDatabaseQuery } from './db-query';
import pool from './db-pool';
import { ERROR_CODE } from '../../util/error-codes';
import Logger from '../logger';

jest.mock('./db-pool');
jest.mock('../logger');

describe('server/db/query', () => {
  it('should call data layer and return data', async () => {
    // Arrange
    const sql = 'SELECT COUNT(*) FROM 1';
    const data = [];
    const expected = {
      field: 'data',
    };
    const dataResult = {
      rows: expected,
    };
    const schemaResult = {
      value: expected,
    };
    pool.query.mockResolvedValue(Promise.resolve(dataResult));
    const mapper = jest.fn(() => expected);
    const schema = {
      validate: jest.fn(() => schemaResult),
    };

    // Act
    const actual = await processDatabaseQuery(sql, data, mapper, schema);

    // Assert
    expect(mapper).toHaveBeenCalledWith(expected);
    expect(schema.validate).toHaveBeenCalledWith(expected);
    expect(actual).toEqual(expected);
  });
  it('should call data layer and throw error on validation problem', async () => {
    // Arrange
    const sql = 'SELECT COUNT(*) FROM 1';
    const data = [];
    const expected = {
      field: 'data',
    };
    const dataResult = {
      rows: expected,
    };
    const schemaResult = {
      error: {
        message: 'Error happened',
        details: { },
      },
      value: expected,
    };
    pool.query.mockResolvedValue(Promise.resolve(dataResult));
    const mapper = jest.fn(() => expected);
    const schema = {
      validate: jest.fn(() => schemaResult),
    };
    const expectedError = ERROR_CODE.DB_INVALID_OBJECT;

    // Act
    try {
      await processDatabaseQuery(sql, data, mapper, schema);
    } catch (e) {
      expect(e).toEqual(expectedError);
    }

    // Assert
    expect(mapper).toHaveBeenCalledWith(expected);
    expect(schema.validate).toHaveBeenCalledWith(expected);
  });
  it('should call data layer and catch database error', async () => {
    // Arrange
    const sql = 'SELECT COUNT(*) FROM 1';
    const data = [];
    const error = { error: 'Error happened' };
    pool.query.mockRejectedValue(error);
    const expectedError = ERROR_CODE.DB_UNKNOWN_ERROR;
    Logger.error = jest.fn();

    // Act
    try {
      await processDatabaseQuery(sql, data);
    } catch (e) {
      expect(e).toEqual(expectedError);
    }

    // Assert
    expect(Logger.error).toHaveBeenCalledWith(JSON.stringify(error));
  });
});
