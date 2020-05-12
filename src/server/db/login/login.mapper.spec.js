import { loginMapper } from './login.mapper';
import { ERROR_CODE } from '../error-codes';

describe('server/db/login/login.mapper', () => {
  xit('should map a row into an object', () => {
    // Arrange
    const src = [{
      id: 'id',
      user_id: 'user-id',
      email: 'email',
    }];
    const expected = {
      id: 'id',
      userId: 'user-id',
      email: 'email',
    };

    // Act
    const result = loginMapper(src);

    // Assert
    expect(result).toEqual(expected);
  });
  xit('should throw an error when it is unexpected', () => {
    // Arrange
    const src = [{
      id: 'id',
      user_id: 'user-id',
      email: 'email',
    }, {
      id: 'id',
      user_id: 'user-id',
      email: 'email',
    }];
    const expectedError = ERROR_CODE.DB_UNEXPECTED_RESULT;

    // Act/Assert
    try {
      loginMapper(src);
    } catch (e) {
      expect(e).toEqual(expectedError);
    }
  });
});
