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

export const resumeSkillsSchema = Joi.array().items({
  id: Joi.number(),
  position: Joi.number().required(),
  name: Joi.string().required(),
  items: Joi.array().items({
    id: Joi.number(),
    position: Joi.number().required(),
    name: Joi.string().required(),
  }).required(),
});

export const resumeExperienceSchema = Joi.array().items({
  id: Joi.number(),
  position: Joi.number().required(),
  title: Joi.string().required(),
  company: Joi.string().required(),
  startDate: Joi.string().required(),
  endDate: Joi.string(),
  description: Joi.array().items({
    id: Joi.number(),
    position: Joi.number().required(),
    type: Joi.string().required(),
    item: Joi.string().required(),
  }),
  bullets: Joi.array().items({
    id: Joi.number(),
    position: Joi.number().required(),
    type: Joi.string().required(),
    item: Joi.string().required(),
  }),
  techs: Joi.array().items({
    id: Joi.number(),
    position: Joi.number().required(),
    type: Joi.string().required(),
    item: Joi.string().required(),
  }),
});

export const resumeEducationSchema = Joi.array().items({
  id: Joi.number(),
  userId: Joi.number(),
  degree: Joi.string().required(),
  school: Joi.string().required(),
  graduationDate: Joi.string().required(),
});
