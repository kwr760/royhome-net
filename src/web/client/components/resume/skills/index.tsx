import { makeStyles } from '@material-ui/core/styles';
import React, { FunctionComponent } from 'react';
import { createStyles, Grid, Theme } from '@material-ui/core';

import { SkillsType } from '../../../../../types/resume.types';

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
    header: {
      fontStyle: 'italic',
      fontWeight: 'normal',
    },
    list: {
      marginTop: '0.5rem',
      marginBottom: 0,
    },
  }),
);

interface Props {
  skills: SkillsType[];
}
const ResumeSkills: FunctionComponent<Props> = ({ skills }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item sm={12}>
        <div className={classes.title}>Skills</div>
      </Grid>
      {
        skills.map((item) => {
          const { name, items } = item;
          return (
            <Grid container key={name}>
              <Grid item className={classes.header} sm={3}>
                {name}
              </Grid>
              <Grid item className={classes.list} sm={9}>
                {items.map((e) => e.name).join(', ')}
              </Grid>
            </Grid>
          );
        })
      }
    </Grid>
  );
};

export default ResumeSkills;
