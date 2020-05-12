import { selectUserIdByEmail } from './select-user-id-by-email';
import { processDatabaseQuery } from '../query';
import { selectLoginByEmailSql } from './login.sql';
import { loginMapper } from './login.mapper';
import { loginSchema } from './login.schema';

jest.mock('../query');

describe('server/db/login/select-user-id-by-email', () => {
  it('should call the function correctly', () => {
    // Arrange
    const email = 'email@company.com';

    // Act
    selectUserIdByEmail(email);

    // Assert
    expect(processDatabaseQuery).toHaveBeenCalledWith(selectLoginByEmailSql, [email], loginMapper, loginSchema);
  });
});
