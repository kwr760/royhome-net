// @flow

import Joi from '@hapi/joi';

export const resumeOwnerSchema = Joi.object().keys({
  id: Joi.number(),
  userId: Joi.number(),
  name: Joi.string().required(),
});

export const resumeAddressSchema = Joi.object().keys({
  id: Joi.number(),
  userId: Joi.number(),
  address: Joi.string().required(),
});

export const resumeContactSchema = Joi.object().keys({
  id: Joi.number(),
  userId: Joi.number(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  displayPhone: Joi.boolean().required(),
});

export const resumeSummarySchema = Joi.object().keys({
  id: Joi.number(),
  userId: Joi.number(),
  summary: Joi.string().required(),
});
