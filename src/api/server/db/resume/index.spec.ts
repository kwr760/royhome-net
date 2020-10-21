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
    (selectUserIdByEmail as jest.Mock).mockReturnValue('user-id');
    (selectOwnerByUserId as jest.Mock).mockReturnValue('owner');
    (selectAddressByUserId as jest.Mock).mockReturnValue('address');
    (selectContactByUserId as jest.Mock).mockReturnValue('contact');
    (selectSummaryByUserId as jest.Mock).mockReturnValue('summary');
    (selectSkillsByUserId as jest.Mock).mockReturnValue('skills');
    (selectExperienceByUserId as jest.Mock).mockReturnValue('experience');
    (selectEducationByUserId as jest.Mock).mockReturnValue('education');
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
