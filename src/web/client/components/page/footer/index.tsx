import { makeStyles } from '@material-ui/core/styles';
import React, { FunctionComponent } from 'react';
import { Container, createStyles, Link, Theme } from '@material-ui/core';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import { VscGithub } from 'react-icons/vsc';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingRight: 0,
      paddingLeft: 0,
      '@media print': {
        display: 'none',
      },
    },
    banner: {
      boxShadow: theme.custom.boxShadow,
      background: theme.custom.backgroundGradient,
      zIndex: 1,
      padding: '1rem',
      textAlign: 'center',
    },
    icon: {
      color: theme.palette.secondary.main,
      '&:hover, &:focus': {
        color: emphasize(theme.palette.secondary.main, 0.4),
      },
    },
  }),
);

const BottomBar: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <footer className={classes.banner}>
        <Link
          href="https://github.com/kwr760/royhome-net"
          target="_target"
        >
          <VscGithub className={`${classes.icon} fa-2x`} />
          <span className="sr-only">Link to GitHub</span>
        </Link>
      </footer>
    </Container>
  );
};

export default BottomBar;
