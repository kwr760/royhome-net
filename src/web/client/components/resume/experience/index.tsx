import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import { isEmpty } from 'lodash';

import './experience.css';
import { ExperienceType } from '../../../../../types/resume.types';

interface Props {
  experience: ExperienceType[];
}
const ResumeExperience: FunctionComponent<Props> = ({ experience }) => (
  <Grid container>
    <Grid item sm={12}>
      <div className="title">Professional Experience</div>
    </Grid>
    {
      experience.map((item) => {
        const {
          title, company, startDate, endDate = 'current', description, bullets, techs,
        } = item;
        return (
          <Grid container key={company}>
            <Grid item>
              <Grid container className="position-info">
                <Grid item sm={8} className="role">
                  {`${title} at ${company}`}
                </Grid>
                <Grid item sm={4} className="text-right">
                  {`${startDate} - ${endDate}`}
                </Grid>
              </Grid>
              <Grid container className="text-justify">
                <Grid item>
                  {description.map((e) => (<p key={e.id}>{e.item}</p>))}
                  { isEmpty(bullets) ? ''
                    : (
                      <ul>
                        {bullets.map((e) => (<li key={e.id}>{ e.item }</li>))}
                      </ul>
                    )}
                  { isEmpty(techs) ? ''
                    : (
                      <Grid container className="experience-list">
                        <Grid item className="experience-header" sm={3}>Technology</Grid>
                        <Grid item sm={9}>
                          {techs.map((e) => e.item).join(', ')}
                        </Grid>
                      </Grid>
                    )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      })
    }
  </Grid>
);

export default ResumeExperience;
