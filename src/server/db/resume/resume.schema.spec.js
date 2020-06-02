import {
  resumeAddressSchema,
  resumeContactSchema,
  resumeOwnerSchema,
  resumeSummarySchema,
  resumeSkillsSchema,
  resumeExperienceSchema,
  resumeEducationSchema,
} from './resume.schema';

describe('server/db/resume/resume.schema', () => {
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
  describe('skillsSchema', () => {
    it('should validate a good object', () => {
      // Arrange
      const object = [{
        id: 1,
        position: 1,
        name: 'skills',
        items: [{
          id: 1,
          position: 1,
          name: 'skill #1',
        }, {
          id: 2,
          position: 2,
          name: 'skill #2',
        }],
      }];

      // Act
      const result = resumeSkillsSchema.validate(object);

      // Assert
      expect(result.error).toBeUndefined();
    });
  });
  describe('experienceSchema', () => {
    it('should validate a good object', () => {
      // Arrange
      const object = [{
        id: 1,
        position: 1,
        title: 'title',
        company: 'company',
        startDate: 'December, 2010',
        description: [{
          id: 1,
          position: 1,
          type: 'text',
          item: 'skill #1',
        }],
        bullets: [{
          id: 2,
          position: 2,
          type: 'bullet',
          item: 'bullet #1',
        }],
        techs: [{
          id: 3,
          position: 3,
          type: 'tech',
          item: 'tech #1',
        }],
      }];

      // Act
      const result = resumeExperienceSchema.validate(object);

      // Assert
      expect(result.error).toBeUndefined();
    });
  });
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
});
