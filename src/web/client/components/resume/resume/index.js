// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

import ResumeHeader from '../header';
import ResumeSkills from '../skills';
import ResumeSummary from '../summary';
import ResumeExperience from '../experience';
import ResumeEducation from '../education';

import type { ResumeType } from '../../../store/resume/resume.types';

import './resume.css';

const ResumePage = ({ resume }: {| resume: ResumeType |}) => {
  const {
    owner = {}, contact = {}, address = {}, summary = {}, skills = [], experience = [], education = [],
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

ResumePage.propTypes = {
  resume: PropTypes.shape({
    owner: PropTypes.shape({}),
    contact: PropTypes.shape({}),
    address: PropTypes.shape({}),
    summary: PropTypes.shape({}),
    skills: PropTypes.arrayOf(PropTypes.shape({})),
    experience: PropTypes.arrayOf(PropTypes.shape({})),
    education: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

ResumePage.defaultProps = {
  resume: {},
};

export default ResumePage;
