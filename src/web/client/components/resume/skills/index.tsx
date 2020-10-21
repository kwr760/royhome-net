import React from 'react';
import { Col, Row } from 'reactstrap';

import './skills.css';
import { SkillsType } from '../../../../../types/resume.types';

interface Props {
  skills: SkillsType[];
}
const ResumeSkills = ({ skills }: Props): JSX.Element => (
  <Row>
    <Col>
      <div className="title">Skills</div>
      {
        skills.map((item) => {
          const { name, items } = item;
          return (
            <Row key={name}>
              <Col className="skill-header" sm="3">
                {name}
              </Col>
              <Col className="skill-list" sm="9">
                {items.map((e) => e.name).join(', ')}
              </Col>
            </Row>
          );
        })
      }
    </Col>
  </Row>
);

export default ResumeSkills;
