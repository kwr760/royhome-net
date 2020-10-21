import { ResumeType } from '../../../../types/resume.types';
import { selectUserIdByEmail } from '../login/select-user-id-by-email';
import { selectOwnerByUserId } from './select-owner-by-user-id';
import { selectContactByUserId } from './select-contact-by-user-id';
import { selectAddressByUserId } from './select-address-by-user-id';
import { selectSummaryByUserId } from './select-summary-by-user-id';
import { selectSkillsByUserId } from './select-skills-by-user-id';
import { selectExperienceByUserId } from './select-experience-by-user-id';
import { selectEducationByUserId } from './select-education-by-user-id';

export const loadResumeByEmail = async (email: string): Promise<ResumeType> => {
  const { userId } = await selectUserIdByEmail(email);
  const owner = await selectOwnerByUserId(userId);
  const contact = await selectContactByUserId(userId);
  const address = await selectAddressByUserId(userId);
  const summary = await selectSummaryByUserId(userId);
  const skills = await selectSkillsByUserId(userId);
  const experience = await selectExperienceByUserId(userId);
  const education = await selectEducationByUserId(userId);

  return {
    owner,
    contact,
    address,
    summary,
    skills,
    experience,
    education,
  };
};
