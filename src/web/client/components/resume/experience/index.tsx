import { makeStyles } from '@material-ui/core/styles';
import React, { FunctionComponent } from 'react';
import { createStyles, Grid, Theme } from '@material-ui/core';
import { isEmpty } from 'lodash';

import { ExperienceType } from '../../../../../types/resume.types';

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
    position: {
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
    },
    list: {
      marginTop: '0.5rem',
      marginBottom: 0,
    },
    header: {
      fontStyle: 'italic',
      fontWeight: 'normal',
    },
    role: {
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
    right: {
      textAlign: 'right',
    },
    justify: {
      textAlign: 'justify',
    },
  }),
);

interface Props {
  experience: ExperienceType[];
}
const ResumeExperience: FunctionComponent<Props> = ({ experience }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item sm={12}>
        <div className={classes.title}>Professional Experience</div>
      </Grid>
      {
        experience.map((item) => {
          const {
            title, company, startDate, endDate = 'current', description, bullets, techs,
          } = item;
          return (
            <Grid container key={company}>
              <Grid item>
                <Grid container className={classes.position}>
                  <Grid item sm={8} className={classes.role}>
                    {`${title} at ${company}`}
                  </Grid>
                  <Grid item sm={4} className={classes.right}>
                    {`${startDate} - ${endDate}`}
                  </Grid>
                </Grid>
                <Grid container className={classes.justify}>
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
                        <Grid container className={classes.list}>
                          <Grid item className={classes.header} sm={3}>Technology</Grid>
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
};

export default ResumeExperience;
