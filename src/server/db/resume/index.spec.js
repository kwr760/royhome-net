import { loadResumeByEmail } from './index';
import { selectUserIdByEmail } from '../login/select-user-id-by-email';
import { selectOwnerByUserId } from './select-owner-by-user-id';
import { selectContactByUserId } from './select-contact-by-user-id';
import { selectAddressByUserId } from './select-address-by-user-id';
import { selectSummaryByUserId } from './select-summary-by-user-id';
import { selectSkillsByUserId } from './select-skills-by-user-id';
import { selectExperienceByUserId } from './select-experience-by-user-id';
import { selectEducationByUserId } from './select-education-by-user-id';

jest.mock('../login/select-user-id-by-email');
jest.mock('./select-owner-by-user-id');
jest.mock('./select-contact-by-user-id');
jest.mock('./select-address-by-user-id');
jest.mock('./select-summary-by-user-id');
jest.mock('./select-skills-by-user-id');
jest.mock('./select-experience-by-user-id');
jest.mock('./select-education-by-user-id');

describe('server/db/resume', () => {
  it('should return resume', async () => {
    // Arrange
    const email = 'email@company.com';
    selectUserIdByEmail.mockReturnValue('user-id');
    selectOwnerByUserId.mockReturnValue('owner');
    selectAddressByUserId.mockReturnValue('address');
    selectContactByUserId.mockReturnValue('contact');
    selectSummaryByUserId.mockReturnValue('summary');
    selectSkillsByUserId.mockReturnValue('skills');
    selectExperienceByUserId.mockReturnValue('experience');
    selectEducationByUserId.mockReturnValue('education');
    const expected = {
      owner: 'owner',
      address: 'address',
      contact: 'contact',
      summary: 'summary',
      skills: 'skills',
      experience: 'experience',
      education: 'education',
    };

    // Act
    const response = await loadResumeByEmail(email);

    // Assert
    expect(response).toEqual(expected);
  });
});
