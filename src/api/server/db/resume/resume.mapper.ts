import { merge } from 'object-mapper';
import { ERROR_CODE } from '../../../util/error-codes';

const addressMap = {
  address: 'address',
};
export interface AddressType {
  address: string;
}

const ownerMap = {
  name: 'name',
};
export interface OwnerType {
  name: string;
}

const contactMap = {
  phone: 'phone',
  email: 'email',
  display_phone: 'displayPhone',
};
export interface ContactType {
  phone: string;
  email: string;
  displayPhone: string;
}

const summaryMap = {
  summary: 'summary',
};
export interface SummaryType {
  summary: string;
}

const skillItemMap = {
  item_id: 'id',
  item_position: 'position',
  item_name: 'name',
};
export interface SkillItemType {
  id: string;
  position: string;
  name: string;
}
const skillMap = {
  skill_id: 'id',
  skill_position: 'position',
  skill_name: 'name',
};
export interface SkillType {
  id: string;
  position: string;
  type: string;
  items: SkillItemType[];
}

const experienceItemMap = {
  item_id: 'id',
  item_position: 'position',
  item_type: 'type',
  item_item: 'item',
};
export interface ExperienceItemType {
  id: string;
  position: string;
  type: string;
  item: string;
}
const experienceMap = {
  experience_id: 'id',
  experience_position: 'position',
  experience_title: 'title',
  experience_company: 'company',
  experience_start_date: 'startDate',
  experience_end_date: 'endDate',
};
export interface ExperienceType {
  id: string;
  position: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: ExperienceItemType[];
  bullets: ExperienceItemType[];
  techs: ExperienceItemType[];
}

const educationMap = {
  degree: 'degree',
  school: 'school',
  graduation_date: 'graduationDate',
};
export interface EducationType {
  degree: string;
  school: string;
  graduationDate: string;
}

export const resumeAddressMapper = (src: unknown[]): AddressType => {
  if (src.length !== 1) {
    throw ERROR_CODE.DB_UNEXPECTED_RESULT;
  }

  return merge(src, addressMap) as AddressType;
};

export const resumeOwnerMapper = (src: unknown[]): OwnerType => {
  if (src.length !== 1) {
    throw ERROR_CODE.DB_UNEXPECTED_RESULT;
  }

  return merge(src, ownerMap) as OwnerType;
};

export const resumeContactMapper = (src: unknown[]): ContactType => {
  if (src.length !== 1) {
    throw ERROR_CODE.DB_UNEXPECTED_RESULT;
  }

  return merge(src, contactMap) as ContactType;
};

export const resumeSummaryMapper = (src: unknown[]): SummaryType => {
  if (src.length !== 1) {
    throw ERROR_CODE.DB_UNEXPECTED_RESULT;
  }

  return merge(src, summaryMap) as SummaryType;
};

export const resumeSkillsMapper = (src: unknown[]): SkillType[] => {
  if (src.length <= 0) {
    throw ERROR_CODE.DB_UNEXPECTED_RESULT;
  }

  return src.reduce((acc: SkillType[], row: SkillType) => {
    const rowSkill = merge(row, skillMap) as SkillType;
    rowSkill.items = [] as SkillItemType[];
    const rowItem = merge(row, skillItemMap) as SkillItemType;
    let skill = acc.find((e) => e.id === rowSkill.id);
    if (!skill) {
      skill = rowSkill;
      acc.push(skill);
    }
    skill.items.push(rowItem);
    return acc;
  }, []) as SkillType[];
};

export const resumeExperienceMapper = (src: unknown[]): ExperienceType[] => {
  if (src.length <= 0) {
    throw ERROR_CODE.DB_UNEXPECTED_RESULT;
  }

  return src.reduce((acc: ExperienceType[], row: ExperienceType) => {
    const rowExperience = merge(row, experienceMap) as ExperienceType;
    rowExperience.description = [];
    rowExperience.bullets = [];
    rowExperience.techs = [];
    const rowItem = merge(row, experienceItemMap) as ExperienceItemType;
    let experience = acc.find((e) => e.id === rowExperience.id);
    if (!experience) {
      experience = rowExperience;
      acc.push(experience);
    }
    switch (rowItem.type) {
    case 'bullet':
      experience.bullets.push(rowItem);
      break;
    case 'tech':
      experience.techs.push(rowItem);
      break;
    default:
      experience.description.push(rowItem);
      break;
    }
    return acc;
  }, []) as ExperienceType[];
};

export const resumeEducationMapper = (src: unknown[]): EducationType[] => {
  const mappedItems: EducationType[] = [];
  if (src.length <= 0) {
    throw ERROR_CODE.DB_UNEXPECTED_RESULT;
  }

  src.forEach((item: unknown[]) => {
    mappedItems.push(merge(item, educationMap) as EducationType);
  });
  return mappedItems;
};
