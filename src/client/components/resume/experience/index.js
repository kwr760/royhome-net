// @flow

import React from 'react';
import { Col, Row } from 'reactstrap';
import type { ResumeType } from '../../../store/resume/resume.types';

const ResumeExperience = ({ resume }: {| resume: ResumeType |}) => (
  <Row>
    <Col>
      <div className="title">Experience</div>
    </Col>
  </Row>
);

export default ResumeExperience;
