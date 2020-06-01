import { OK } from 'http-status-codes';
import getResumeHandler from './get-resume';
import { selectUserIdByEmail } from '../../db/login/select-user-id-by-email';
import { selectOwnerByUserId } from '../../db/resume/select-owner-by-user-id';
import { selectContactByUserId } from '../../db/resume/select-contact-by-user-id';
import { selectAddressByUserId } from '../../db/resume/select-address-by-user-id';
import { selectSummaryByUserId } from '../../db/resume/select-summary-by-user-id';
import { selectSkillsByUserId } from '../../db/resume/select-skills-by-user-id';
import { selectEducationByUserId } from '../../db/resume/select-education-by-user-id';

jest.mock('../../db/login/select-user-id-by-email');
jest.mock('../../db/resume/select-owner-by-user-id');
jest.mock('../../db/resume/select-contact-by-user-id');
jest.mock('../../db/resume/select-address-by-user-id');
jest.mock('../../db/resume/select-summary-by-user-id');
jest.mock('../../db/resume/select-skills-by-user-id');
jest.mock('../../db/resume/select-education-by-user-id');

describe('server/routes/resume/get', () => {
  it('should return default response', async () => {
    // Arrange
    const req = {};
    const res = {};
    selectUserIdByEmail.mockReturnValue('user-id');
    selectOwnerByUserId.mockReturnValue('owner');
    selectAddressByUserId.mockReturnValue('address');
    selectContactByUserId.mockReturnValue('contact');
    selectSummaryByUserId.mockReturnValue('summary');
    selectSkillsByUserId.mockReturnValue('skills');
    selectEducationByUserId.mockReturnValue('education');
    const expected = {
      status: OK,
      body: {
        resume: {
          owner: 'owner',
          address: 'address',
          contact: 'contact',
          summary: 'summary',
          skills: 'skills',
          education: 'education',
        },
      },
    };

    // Act
    const response = await getResumeHandler(req, res);

    // Assert
    expect(response).toEqual(expected);
  });
});
