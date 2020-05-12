import { resumeAddressSchema, resumeContactSchema, resumeOwnerSchema } from './resume.schema';

describe('server/db/resume/resume.schema', () => {
  describe('addressSchema', () => {
    xit('should validate a good object', () => {
      // Arrange
      const object = {
        id: 100,
        userId: 1000,
        address: 'address',
      };

      // Act
      const result = resumeAddressSchema.validate(object);

      // Assert
      expect(result.error).toBeUndefined();
    });
  });
  describe('contactSchema', () => {
    xit('should validate a good object', () => {
      // Arrange
      const object = {
        id: 100,
        userId: 1000,
        phone: 'phone',
        email: 'email@company.com',
        displayPhone: true,
      };

      // Act
      const result = resumeContactSchema.validate(object);

      // Assert
      expect(result.error).toBeUndefined();
    });
  });
  describe('ownerSchema', () => {
    xit('should validate a good object', () => {
      // Arrange
      const object = {
        id: 100,
        userId: 1000,
        name: 'name',
      };

      // Act
      const result = resumeOwnerSchema.validate(object);

      // Assert
      expect(result.error).toBeUndefined();
    });
  });
});
