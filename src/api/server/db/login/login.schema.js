// @flow

import Joi from '@hapi/joi';

export const loginSchema = Joi.object().keys({
  id: Joi.number().required(),
  userId: Joi.number().required(),
  email: Joi.string().email().required(),
});
