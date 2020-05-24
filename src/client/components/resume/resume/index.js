// @flow

import React from 'react';

import ResumeHeader from '../header';
import ResumeSkills from '../skills';
import ResumeSummary from '../summary';
import ResumeExperience from '../experience';
import ResumeEducation from '../education';
import type { ResumeStateType } from '../../../store/resume/resume.types';

const ResumePage = ({ resume = {} }: {| resume: ResumeStateType |}) => {
  const { owner = {}, contact = {}, address = {} } = resume;

  return (
    <>
      <ResumeHeader owner={owner} contact={contact} address={address} />
      <ResumeSummary resume={resume} />
      <ResumeSkills resume={resume} />
      <ResumeExperience resume={resume} />
      <ResumeEducation resume={resume} />
    </>
  );
};

export default ResumePage;
