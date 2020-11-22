import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { FunctionComponent } from 'react';
import spinner from '../../../assets/loading.svg';

const useStyles = makeStyles(() =>
  createStyles({
    spinner: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
    },
    loading: {
      position: 'absolute',
      top: '45%',
      width: '10%',
      height: '10%',
    },
  }),
);
const Loading: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.spinner}>
      <img className={classes.loading} src={spinner} alt="Loading" />
    </div>
  );
};

export default Loading;
