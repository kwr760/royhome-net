// @flow

import { OK } from 'http-status-codes';
import { selectUserIdByEmail } from '../../db/login/select-user-id-by-email';
import { selectOwnerByUserId } from '../../db/resume/select-owner-by-user-id';
import { selectContactByUserId } from '../../db/resume/select-contact-by-user-id';
import { selectAddressByUserId } from '../../db/resume/select-address-by-user-id';

const getResumeHandler = async () => {
  const email = 'kroy760@gmail.com';

  const { userId } = await selectUserIdByEmail(email);
  const owner = await selectOwnerByUserId(userId);
  const contact = await selectContactByUserId(userId);
  const address = await selectAddressByUserId(userId);

  const resume = {
    owner,
    contact,
    address,
  };

  return {
    status: OK,
    body: {
      resume,
    },
  };
};

export default getResumeHandler;
