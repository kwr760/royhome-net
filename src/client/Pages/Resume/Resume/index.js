// @flow

import React from 'react';

import ResumeHeader from '../Header';
import ResumeSkills from '../Skills';
import ResumeSummary from '../Summary';
import ResumeExperience from '../Experience';
import ResumeEducation from '../Education';

const ResumePage = () => (
  <>
    <ResumeHeader />
    <ResumeSummary />
    <ResumeSkills />
    <ResumeExperience />
    <ResumeEducation />
  </>
);

export default ResumePage;
