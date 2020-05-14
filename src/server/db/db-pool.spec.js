/* eslint-disable global-require */
import { Pool } from 'pg';

jest.mock('pg');
jest.mock('dotenv');

describe('server/db/pool', () => {
  it('should create the pool without env file', () => {
    jest.isolateModules(() => {
      // Arrange
      const config = {
        connectionString: 'postgresql://:@:/',
      };

      // Act
      require('./db-pool');

      // Assert
      expect(Pool).toHaveBeenCalledWith(config);
    });
  });
});
