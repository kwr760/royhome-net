import { ERROR_CODE } from '@api/util/error-codes';
import {
  resumeAddressMapper,
  resumeContactMapper,
  resumeOwnerMapper,
  resumeSummaryMapper,
  resumeSkillsMapper,
  resumeExperienceMapper,
  resumeEducationMapper,
} from './resume.mapper';

describe('server/db/resume/resume.mapper', () => {
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
  describe('skillsMap', () => {
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
      const result = resumeSkillsMapper(src);

      // Assert
      expect(result).toEqual(expected);
    });
    it('should throw an error when it is unexpected', () => {
      // Arrange
      const src = [];
      const expectedError = ERROR_CODE.DB_UNEXPECTED_RESULT;

      // Act/Assert
      try {
        resumeSkillsMapper(src);
      } catch (e) {
        expect(e).toEqual(expectedError);
      }
    });
  });
  describe('experienceMap', () => {
    it('should map a experience with multiple item', () => {
      // Arrange
      const src = [{
        experience_id: 1,
        experience_position: 1,
        experience_title: 'title',
        experience_company: 'company',
        experience_start_date: 'startDate',
        experience_end_date: 'endDate',
        item_id: 1,
        item_position: 1,
        item_type: 'text',
        item_item: 'description #1',
      }, {
        experience_id: 1,
        experience_position: 1,
        experience_title: 'title',
        experience_company: 'company',
        experience_start_date: 'startDate',
        experience_end_date: 'endDate',
        item_id: 2,
        item_position: 2,
        item_type: 'text',
        item_item: 'description #2',
      }, {
        experience_id: 1,
        experience_position: 1,
        experience_title: 'title',
        experience_company: 'company',
        experience_start_date: 'startDate',
        experience_end_date: 'endDate',
        item_id: 3,
        item_position: 3,
        item_type: 'bullet',
        item_item: 'bullet #1',
      }, {
        experience_id: 1,
        experience_position: 1,
        experience_title: 'title',
        experience_company: 'company',
        experience_start_date: 'startDate',
        experience_end_date: 'endDate',
        item_id: 4,
        item_position: 4,
        item_type: 'bullet',
        item_item: 'bullet #2',
      }, {
        experience_id: 1,
        experience_position: 1,
        experience_title: 'title',
        experience_company: 'company',
        experience_start_date: 'startDate',
        experience_end_date: 'endDate',
        item_id: 5,
        item_position: 5,
        item_type: 'tech',
        item_item: 'tech #1',
      }, {
        experience_id: 1,
        experience_position: 1,
        experience_title: 'title',
        experience_company: 'company',
        experience_start_date: 'startDate',
        experience_end_date: 'endDate',
        item_id: 6,
        item_position: 6,
        item_type: 'tech',
        item_item: 'tech #2',
      }];
      const expected = [{
        id: 1,
        position: 1,
        title: 'title',
        company: 'company',
        startDate: 'startDate',
        endDate: 'endDate',
        description: [
          {
            id: 1,
            position: 1,
            type: 'text',
            item: 'description #1',
          },
          {
            id: 2,
            position: 2,
            type: 'text',
            item: 'description #2',
          },
        ],
        bullets: [
          {
            id: 3,
            position: 3,
            type: 'bullet',
            item: 'bullet #1',
          },
          {
            id: 4,
            position: 4,
            type: 'bullet',
            item: 'bullet #2',
          },
        ],
        techs: [
          {
            id: 5,
            position: 5,
            type: 'tech',
            item: 'tech #1',
          },
          {
            id: 6,
            position: 6,
            type: 'tech',
            item: 'tech #2',
          },
        ],
      }];

      // Act
      const result = resumeExperienceMapper(src);

      // Assert
      expect(result).toEqual(expected);
    });
    it('should throw an error when it is unexpected', () => {
      // Arrange
      const src = [];
      const expectedError = ERROR_CODE.DB_UNEXPECTED_RESULT;

      // Act/Assert
      try {
        resumeExperienceMapper(src);
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
});
