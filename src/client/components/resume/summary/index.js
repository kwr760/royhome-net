// @flow

import React from 'react';
import { Col, Row } from 'reactstrap';

import type { SummaryType } from '../../../store/resume/resume.types';

const ResumeSummary = ({ summary = {} }: {| summary: SummaryType |}) => {
  const { summary: summaryText = '' } = summary;
  return (
    <Row>
      <Col>
        <div className="title">Summary</div>
        <div className="content text-justify">
          { summaryText }
        </div>
      </Col>
    </Row>
  );
};

export default ResumeSummary;
