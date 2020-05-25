import { ERROR_CODE } from '../../../util/error-codes';
import {
  resumeAddressMapper, resumeContactMapper, resumeOwnerMapper, resumeSummaryMapper, resumeEducationMapper,
} from './resume.mapper';

describe('server/db/resume/resume.mapper', () => {
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
