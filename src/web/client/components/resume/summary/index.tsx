import { makeStyles } from '@material-ui/core/styles';
import React, { FunctionComponent } from 'react';
import { createStyles, Grid, Theme } from '@material-ui/core';
import { SummaryType } from '../../../../../types/resume.types';

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
    content: {
      textAlign: 'justify',
    },
  }),
);

interface Props {
  summary: SummaryType;
}
const ResumeSummary: FunctionComponent<Props> = ({ summary }) => {
  const classes = useStyles();
  const { summary: summaryText = '' } = summary;
  return (
    <Grid container>
      <Grid item sm={12}>
        <div className={classes.title}>Summary</div>
      </Grid>
      <Grid item>
        <div className={classes.content}>
          { summaryText }
        </div>
      </Grid>
    </Grid>
  );
};

export default ResumeSummary;
