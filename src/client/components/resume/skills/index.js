// @flow

import React from 'react';
import { Col, Row } from 'reactstrap';
import { isEmpty } from 'lodash';

import type { SkillsType } from '../../../store/resume/resume.types';

import './skills.css';

const ResumeSkills = ({ skills = [{}] }: {| skills: [SkillsType] |}) => (
  <Row>
    <Col>
      <div className="title">Skills</div>
      {
        skills.map((item) => {
          if (isEmpty(item)) {
            return '';
          }
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
