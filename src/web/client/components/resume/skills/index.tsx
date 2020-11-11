import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';

import './skills.css';
import { SkillsType } from '../../../../../types/resume.types';

interface Props {
  skills: SkillsType[];
}
const ResumeSkills: FunctionComponent<Props> = ({ skills }) => (
  <Grid container>
    <Grid item sm={12}>
      <div className="title">Skills</div>
    </Grid>
    {
      skills.map((item) => {
        const { name, items } = item;
        return (
          <Grid container key={name}>
            <Grid item className="skill-header" sm={3}>
              {name}
            </Grid>
            <Grid item className="skill-list" sm={9}>
              {items.map((e) => e.name).join(', ')}
            </Grid>
          </Grid>
        );
      })
    }
  </Grid>
);

export default ResumeSkills;
