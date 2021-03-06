import { loginSchema } from './login.schema';

describe('server/db/login/login.schema', () => {
  it('should validate a good object', () => {
    // Arrange
    const object = {
      id: 100,
      userId: 1000,
      email: 'email@company.com',
    };

    // Act
    const result = loginSchema.validate(object);

    // Assert
    expect(result.error).toBeUndefined();
  });
  it('should find bad id', () => {
    // Arrange
    const object = {
      id: 'id',
      userId: 1000,
      email: 'email@company.com',
    };

    // Act
    const result = loginSchema.validate(object);

    // Assert
    expect(result.error).not.toBeUndefined();
  });
  it('should find bad user id', () => {
    // Arrange
    const object = {
      id: 100,
      userId: 'user-id',
      email: 'email@company.com',
    };

    // Act
    const result = loginSchema.validate(object);

    // Assert
    expect(result.error).not.toBeUndefined();
  });
  it('should find bad email', () => {
    // Arrange
    const object = {
      id: 100,
      userId: 1000,
      email: 'emailcompany.com',
    };

    // Act
    const result = loginSchema.validate(object);

    // Assert
    expect(result.error).not.toBeUndefined();
  });
});
