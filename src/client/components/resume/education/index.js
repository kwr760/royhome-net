// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import type { EducationType } from '../../../store/resume/resume.types';

const ResumeEducation = ({ education }: {| education: EducationType |}) => (
  <Row>
    <Col>
      <div className="title">Education</div>
      {
        education.map((item) => {
          const { degree, school, graduationDate } = item;
          return (
            <Row key={school}>
              <Col sm="9">
                {degree}
                ,
                <i>{school}</i>
              </Col>
              <Col sm="3" className="text-right">
                {graduationDate}
              </Col>
            </Row>
          );
        })
      }
    </Col>
  </Row>
);

ResumeEducation.propTypes = {
  education: PropTypes.arrayOf(
    PropTypes.shape({
      degree: PropTypes.string.isRequired,
      school: PropTypes.string.isRequired,
      graduationDate: PropTypes.string.isRequired,
    }),
  ),
};

ResumeEducation.defaultProps = {
  education: [],
};

export default ResumeEducation;
