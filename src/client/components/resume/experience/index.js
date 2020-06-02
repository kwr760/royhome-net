// @flow

import React from 'react';
import { Col, Row } from 'reactstrap';
import { isEmpty } from 'lodash';
import type { ExperienceType } from '../../../store/resume/resume.types';

import './experience.css';

const ResumeExperience = ({ experience = [{}] }: {| experience: [ExperienceType] |}) => (
  <Row>
    <Col>
      <div className="title">Professional Experience</div>
      {
        experience.map((item) => {
          if (isEmpty(item)) {
            return '';
          }
          const {
            title, company, startDate, endDate = 'current', description, bullets, techs,
          } = item;
          return (
            <Row key={company}>
              <Col>
                <Row className="position-info">
                  <Col sm="8" className="role">
                    {`${title} at ${company}`}
                  </Col>
                  <Col sm="4" className="text-right">
                    {`${startDate} - ${endDate}`}
                  </Col>
                </Row>
                <Row className="text-justify">
                  <Col>
                    {description.map((e) => (<p key={e.id}>{e.item}</p>))}
                    { isEmpty(bullets) ? ''
                      : (
                        <ul>
                          {bullets.map((e) => (<li key={e.id}>{ e.item }</li>))}
                        </ul>
                      )}
                    { isEmpty(techs) ? ''
                      : (
                        <Row className="experience-list">
                          <Col className="experience-header" sm="3">Technology</Col>
                          <Col sm="9">
                            {techs.map((e) => e.item).join(', ')}
                          </Col>
                        </Row>
                      )}
                  </Col>
                </Row>
              </Col>
            </Row>
          );
        })
      }
    </Col>
  </Row>
);

export default ResumeExperience;
