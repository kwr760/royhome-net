import React, { FunctionComponent } from 'react';
import { Col, Row } from 'reactstrap';
import { SummaryType } from '../../../../../types/resume.types';

interface Props {
  summary: SummaryType;
}
const ResumeSummary: FunctionComponent<Props> = ({ summary }) => {
  const { summary: summaryText = '' } = summary;
  return (
    <Row>
      <Col>
        <div className="title">Summary for test </div>
        <div className="content text-justify">
          { summaryText }
        </div>
      </Col>
    </Row>
  );
};

export default ResumeSummary;
