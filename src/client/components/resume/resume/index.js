// @flow

import React from 'react';
import { Container } from 'reactstrap';

import ResumeHeader from '../header';
import ResumeSkills from '../skills';
import ResumeSummary from '../summary';
import ResumeExperience from '../experience';
import ResumeEducation from '../education';

import type { ResumeStateType } from '../../../store/resume/resume.types';

import './resume.css';

const ResumePage = ({ resume = {} }: {| resume: ResumeStateType |}) => {
  const {
    owner = {}, contact = {}, address = {}, summary = {},
  } = resume;

  return (
    <Container>
      <ResumeHeader owner={owner} contact={contact} address={address} />
      <ResumeSummary summary={summary} />
      <ResumeSkills resume={resume} />
      <ResumeExperience resume={resume} />
      <ResumeEducation resume={resume} />
    </Container>
  );
};

export default ResumePage;
