import { ERROR_CODE } from '../../../util/error-codes';
import {
  resumeAddressMapper,
  resumeContactMapper,
  resumeOwnerMapper,
  resumeSummaryMapper,
  resumeEducationMapper,
  resumeSkillMapper,
} from './resume.mapper';

describe('server/db/resume/resume.mapper', () => {
  describe('skillMap', () => {
    it('should map a skill with multiple item', () => {
      // Arrange
      const src = [{
        skill_id: 1,
        skill_position: 1,
        skill_name: 'Languages',
        item_id: 1,
        item_position: 1,
        item_name: 'PHP',
      }, {
        skill_id: 1,
        skill_position: 1,
        skill_name: 'Languages',
        item_id: 2,
        item_position: 2,
        item_name: 'HTML',
      }];
      const expected = [{
        id: 1,
        position: 1,
        name: 'Languages',
        items: [
          {
            id: 1,
            position: 1,
            name: 'PHP',
          },
          {
            id: 2,
            position: 2,
            name: 'HTML',
          },
        ],
      }];

      // Act
      const result = resumeSkillMapper(src);

      // Assert
      expect(result).toEqual(expected);
    });
    it('should throw an error when it is unexpected', () => {
      // Arrange
      const src = [];
      const expectedError = ERROR_CODE.DB_UNEXPECTED_RESULT;

      // Act/Assert
      try {
        resumeSkillMapper(src);
      } catch (e) {
        expect(e).toEqual(expectedError);
      }
    });
  });
  describe('educationMap', () => {
    it('should map a row into an object', () => {
      // Arrange
      const src = [{
        id: 'id',
        user_id: 'user-id',
        degree: 'degree',
        school: 'school',
        graduation_date: '2000-01-01',
      }];
      const expected = [{
        degree: 'degree',
        school: 'school',
        graduationDate: '2000-01-01',
      }];

      // Act
      const result = resumeEducationMapper(src);

      // Assert
      expect(result).toEqual(expected);
    });
    it('should throw an error when it is unexpected', () => {
      // Arrange
      const src = [];
      const expectedError = ERROR_CODE.DB_UNEXPECTED_RESULT;

      // Act/Assert
      try {
        resumeEducationMapper(src);
      } catch (e) {
        expect(e).toEqual(expectedError);
      }
    });
  });
  describe('summaryMap', () => {
    it('should map a row into an object', () => {
      // Arrange
      const src = [{
        id: 'id',
        user_id: 'user-id',
        summary: 'summary',
      }];
      const expected = {
        summary: 'summary',
      };

      // Act
      const result = resumeSummaryMapper(src);

      // Assert
      expect(result).toEqual(expected);
    });
    it('should throw an error when it is unexpected', () => {
      // Arrange
      const src = [];
      const expectedError = ERROR_CODE.DB_UNEXPECTED_RESULT;

      // Act/Assert
      try {
        resumeSummaryMapper(src);
      } catch (e) {
        expect(e).toEqual(expectedError);
      }
    });
  });
  describe('addressMap', () => {
    it('should map a row into an object', () => {
      // Arrange
      const src = [{
        id: 'id',
        user_id: 'user-id',
        address: 'address',
      }];
      const expected = {
        address: 'address',
      };

      // Act
      const result = resumeAddressMapper(src);

      // Assert
      expect(result).toEqual(expected);
    });
    it('should throw an error when it is unexpected', () => {
      // Arrange
      const src = [];
      const expectedError = ERROR_CODE.DB_UNEXPECTED_RESULT;

      // Act/Assert
      try {
        resumeAddressMapper(src);
      } catch (e) {
        expect(e).toEqual(expectedError);
      }
    });
  });
  describe('contactMap', () => {
    it('should map a row into an object', () => {
      // Arrange
      const src = [{
        id: 'id',
        user_id: 'user-id',
        phone: 'phone',
        email: 'email',
        display_phone: true,
      }];
      const expected = {
        phone: 'phone',
        email: 'email',
        displayPhone: true,
      };

      // Act
      const result = resumeContactMapper(src);

      // Assert
      expect(result).toEqual(expected);
    });
    it('should throw an error when it is unexpected', () => {
      // Arrange
      const src = [];
      const expectedError = ERROR_CODE.DB_UNEXPECTED_RESULT;

      // Act/Assert
      try {
        resumeContactMapper(src);
      } catch (e) {
        expect(e).toEqual(expectedError);
      }
    });
  });
  describe('ownerMap', () => {
    it('should map a row into an object', () => {
      // Arrange
      const src = [{
        id: 'id',
        user_id: 'user-id',
        name: 'name',
      }];
      const expected = {
        name: 'name',
      };

      // Act
      const result = resumeOwnerMapper(src);

      // Assert
      expect(result).toEqual(expected);
    });
    it('should throw an error when it is unexpected', () => {
      // Arrange
      const src = [];
      const expectedError = ERROR_CODE.DB_UNEXPECTED_RESULT;

      // Act/Assert
      try {
        resumeOwnerMapper(src);
      } catch (e) {
        expect(e).toEqual(expectedError);
      }
    });
  });
});
