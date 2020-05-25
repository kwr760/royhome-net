// @flow

import React from 'react';
import { Col, Row } from 'reactstrap';
import { isEmpty } from 'lodash';
import type { EducationType } from '../../../store/resume/resume.types';

const ResumeEducation = ({ education = [{}] }: {| education: [EducationType] |}) => (
  <Row>
    <Col>
      <div className="title">Education</div>
      {
        education.map((item) => {
          if (isEmpty(item)) {
            return '';
          }
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

export default ResumeEducation;
