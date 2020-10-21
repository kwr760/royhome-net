import React from 'react';
import { Col, Row } from 'reactstrap';
import { EducationType } from '../../../../types/resume.types';

interface Props {
  education: EducationType[];
}
const ResumeEducation = ({ education }: Props): JSX.Element => (
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

export default ResumeEducation;
