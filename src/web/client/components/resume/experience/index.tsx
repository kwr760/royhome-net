import React from 'react';
import { Col, Row } from 'reactstrap';
import { isEmpty } from 'lodash';

import './experience.css';
import { ExperienceType } from '../../../../types/resume.types';

interface Props {
  experience: ExperienceType[];
}
const ResumeExperience = ({ experience }: Props): JSX.Element => (
  <Row>
    <Col>
      <div className="title">Professional Experience</div>
      {
        experience.map((item) => {
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
