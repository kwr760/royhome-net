import React, { FunctionComponent } from 'react';
import { Container } from 'reactstrap';
import {
  AddressType,
  ContactType, EducationType, ExperienceType,
  OwnerType,
  ResumeType,
  SkillsType,
  SummaryType,
} from '../../../../../types/resume.types';

import ResumeHeader from '../header';
import ResumeSkills from '../skills';
import ResumeSummary from '../summary';
import ResumeExperience from '../experience';
import ResumeEducation from '../education';

import './resume.css';

interface Props {
  resume: ResumeType;
}
const ResumePage: FunctionComponent<Props> = ({ resume = {} as ResumeType}) => {
  const {
    owner = {} as OwnerType,
    contact = {} as ContactType,
    address = {} as AddressType,
    summary = {} as SummaryType,
    skills = [] as SkillsType[],
    experience = [] as ExperienceType[],
    education = [] as EducationType[],
  } = resume;

  return (
    <Container className="mb-3">
      <ResumeHeader owner={owner} contact={contact} address={address} />
      <ResumeSummary summary={summary} />
      <ResumeSkills skills={skills} />
      <ResumeExperience experience={experience} />
      <ResumeEducation education={education} />
    </Container>
  );
};

export default ResumePage;
