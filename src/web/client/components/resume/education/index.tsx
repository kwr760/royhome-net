import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import { EducationType } from '../../../../../types/resume.types';

interface Props {
  education: EducationType[];
}
const ResumeEducation: FunctionComponent<Props> = ({ education }) => (
  <Grid container>
    <Grid item sm={12}>
      <div className="title">Education</div>
    </Grid>
    {
      education.map((item) => {
        const { degree, school, graduationDate } = item;
        return (
          <Grid container key={school}>
            <Grid item sm={9}>
              {degree}
              ,
              <i>{school}</i>
            </Grid>
            <Grid item sm={3} className="text-right">
              {graduationDate}
            </Grid>
          </Grid>
        );
      })
    }
  </Grid>
);

export default ResumeEducation;
