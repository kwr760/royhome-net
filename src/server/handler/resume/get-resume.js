// @flow

import { OK } from 'http-status-codes';
import { selectUserIdByEmail } from '../../db/login/select-user-id-by-email';
import { selectOwnerByUserId } from '../../db/resume/select-owner-by-user-id';
import { selectContactByUserId } from '../../db/resume/select-contact-by-user-id';
import { selectAddressByUserId } from '../../db/resume/select-address-by-user-id';
import { selectSummaryByUserId } from '../../db/resume/select-summary-by-user-id';
import { selectEducationByUserId } from '../../db/resume/select-education-by-user-id';

const getResumeHandler = async () => {
  const email = 'kroy760@gmail.com';

  const { userId } = await selectUserIdByEmail(email);
  const owner = await selectOwnerByUserId(userId);
  const contact = await selectContactByUserId(userId);
  const address = await selectAddressByUserId(userId);
  const summary = await selectSummaryByUserId(userId);
  const education = await selectEducationByUserId(userId);

  const resume = {
    owner,
    contact,
    address,
    summary,
    education,
  };

  return {
    status: OK,
    body: {
      resume,
    },
  };
};

export default getResumeHandler;
