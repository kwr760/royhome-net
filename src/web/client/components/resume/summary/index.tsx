import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';
import { SummaryType } from '../../../../../types/resume.types';

interface Props {
  summary: SummaryType;
}
const ResumeSummary: FunctionComponent<Props> = ({ summary }) => {
  const { summary: summaryText = '' } = summary;
  return (
    <Grid container>
      <Grid item sm={12}>
        <div className="title">Summary</div>
      </Grid>
      <Grid item>
        <div className="content text-justify">
          { summaryText }
        </div>
      </Grid>
    </Grid>
  );
};

export default ResumeSummary;
