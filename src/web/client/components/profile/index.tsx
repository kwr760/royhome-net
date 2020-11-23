import { makeStyles } from '@material-ui/core/styles';
import React, { FunctionComponent } from 'react';
import { Container, createStyles, Grid, Theme } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { getUser } from '../../store/user/user.selector';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      alignItems: 'center',
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        textAlign: 'left',
      },
    },
    picture: {
      boxShadow: theme.custom.boxShadow,
      borderRadius: '50%',
    },
    email: {
      color: theme.palette.text.secondary,
      margin: '1px',
      marginLeft: 0,
      [theme.breakpoints.up('sm')]: {
        marginLeft: '2rem',
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: 0,
      },
    },
    header: {
      margin: '1px',
      marginLeft: 0,
      [theme.breakpoints.up('sm')]: {
        marginLeft: '2rem',
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: 0,
      },
    },
    center: {
      textAlign: 'center',
    },
    code: {
      fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
    },
    pre: {
      borderRadius: '0.25rem',
      width: '100%',
      backgroundColor: theme.palette.background.default,
      padding: '1rem',
      boxShadow: theme.custom.boxShadow,
      color: theme.palette.text.primary,
    },
  }),
);

const Profile: FunctionComponent = () => {
  const classes = useStyles();
  const user = useSelector(getUser);

  return (
    <Container>
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={2} className={classes.center}>
          <img
            src={user.picture}
            alt="Profile"
            className={classes.picture}
          />
        </Grid>
        <Grid item xs={12} sm >
          <h2 className={classes.header}>{user.name}</h2>
          <p className={classes.email}>{user.email}</p>
        </Grid>
      </Grid>
      <Grid container>
        <pre className={classes.pre}>
          <code className={classes.code}>
            {JSON.stringify(user, null, 2)}
          </code>
        </pre>
      </Grid>
    </Container>
  );
};

export default Profile;
