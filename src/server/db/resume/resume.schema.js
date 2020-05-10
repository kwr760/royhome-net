// @flow

import Joi from '@hapi/joi';

export const resumeOwnerSchema = Joi.object().keys({
  id: Joi.number().required(),
  userId: Joi.number().required(),
  name: Joi.string().required(),
});

export const resumeAddressSchema = Joi.object().keys({
  id: Joi.number().required(),
  userId: Joi.number().required(),
  address: Joi.string().required(),
});

export const resumeContactSchema = Joi.object().keys({
  id: Joi.number().required(),
  userId: Joi.number().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  displayPhone: Joi.boolean().required(),
});
