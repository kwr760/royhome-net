// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

import type { SummaryType } from '../../../store/resume/resume.types';

const ResumeSummary = ({ summary }: {| summary: SummaryType |}) => {
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

ResumeSummary.propTypes = {
  summary: PropTypes.shape({
    summary: PropTypes.string,
  }),
};

ResumeSummary.defaultProps = {
  summary: {},
};

export default ResumeSummary;
