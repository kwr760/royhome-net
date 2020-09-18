// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

import type { SkillsType } from '../../../store/resume/resume.types';

import './skills.css';

const ResumeSkills = ({ skills }: {| skills: SkillsType |}) => (
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

ResumeSkills.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      position: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          position: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }),
      ),
    }),
  ),
};

ResumeSkills.defaultProps = {
  skills: [],
};

export default ResumeSkills;
