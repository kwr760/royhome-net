import {
  resumeAddressSchema, resumeContactSchema, resumeOwnerSchema, resumeSummarySchema, resumeEducationSchema,
} from './resume.schema';

describe('server/db/resume/resume.schema', () => {
  describe('educationSchema', () => {
    it('should validate a good object', () => {
      // Arrange
      const object = [{
        id: 100,
        userId: 1000,
        degree: 'degree',
        school: 'school',
        graduationDate: '2000-01-01',
      }];

      // Act
      const result = resumeEducationSchema.validate(object);

      // Assert
      expect(result.error).toBeUndefined();
    });
  });
  describe('summarySchema', () => {
    it('should validate a good object', () => {
      // Arrange
      const object = {
        id: 100,
        userId: 1000,
        summary: 'summary',
      };

      // Act
      const result = resumeSummarySchema.validate(object);

      // Assert
      expect(result.error).toBeUndefined();
    });
  });
  describe('addressSchema', () => {
    it('should validate a good object', () => {
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
    it('should validate a good object', () => {
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
    it('should validate a good object', () => {
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
