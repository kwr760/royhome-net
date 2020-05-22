// @flow

import React from 'react';

import ResumeHeader from '../header';
import ResumeSkills from '../skills';
import ResumeSummary from '../summary';
import ResumeExperience from '../experience';
import ResumeEducation from '../education';

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
