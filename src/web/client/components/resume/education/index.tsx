import { makeStyles } from '@material-ui/core/styles';
import React, { FunctionComponent } from 'react';
import { createStyles, Grid, Theme } from '@material-ui/core';
import { EducationType } from '../../../../../types/resume.types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginBottom: theme.spacing(3),
      textTransform: 'uppercase',
      fontSize: 'larger',
      fontWeight: 'bold',
      marginTop: '10px',
      borderBottom: '1px solid',
    },
    date: {
      textAlign: 'right',
    },
  }),
);

interface Props {
  education: EducationType[];
}
const ResumeEducation: FunctionComponent<Props> = ({ education }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item sm={12}>
        <div className={classes.title}>Education</div>
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
              <Grid item sm={3} className={classes.date}>
                {graduationDate}
              </Grid>
            </Grid>
          );
        })
      }
    </Grid>
  );
};

export default ResumeEducation;
