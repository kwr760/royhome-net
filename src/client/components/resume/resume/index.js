// @flow

import React from 'react';
import { Container } from 'reactstrap';

import ResumeHeader from '../header';
import ResumeSkills from '../skills';
import ResumeSummary from '../summary';
import ResumeExperience from '../experience';
import ResumeEducation from '../education';

import type { ResumeType } from '../../../store/resume/resume.types';

import './resume.css';

const ResumePage = ({ resume = {} }: {| resume: ResumeType |}) => {
  const {
    owner = {}, contact = {}, address = {}, summary = {}, skills = [{}], experience = [{}], education = [{}],
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
