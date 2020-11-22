import { makeStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import React, { FunctionComponent, useCallback } from 'react';
import { Button, createStyles, Theme } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { FiSun, FiMoon } from 'react-icons/fi';
import { DarkModes } from '../../../store/session/session.constants';
import { updateDarkMode } from '../../../store/session/session.slice';
import { getDarkMode } from '../../../store/session/session.selector';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(3),
      border: theme.spacing(0),
      lineHeight: '1.2',
      borderRadius: '1rem',
      paddingRight: '0.5rem',
      paddingLeft: '0.5rem',
      minWidth: 0,
      background: theme.palette.primary.dark,
      color: theme.palette.secondary.main,
      outline: 'none',
      '&:hover, &:focus&:hover': {
        background: theme.palette.primary.light,
        color: emphasize(theme.palette.secondary.main, 0.4),
        borderRadius: '1rem',
        outline: 'none',
      },
      '&:focus': {
        background: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        borderRadius: '1rem',
        outline: 'none',
      },
    },
    moonFix: {
      marginBottom: '0.125rem',
    },
  }),
);

const DarkButton: FunctionComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const darkness = useSelector(getDarkMode);
  const changeDarkMode = (mode: string) => {
    dispatch(updateDarkMode(mode));
  };
  const handleClick = useCallback(changeDarkMode, [dispatch]);
  const Icon = (darkness === DarkModes.DARK_MODE) ? <FiMoon className={classes.moonFix} /> : <FiSun />;
  const mode = (darkness === DarkModes.DARK_MODE) ? DarkModes.LIGHT_MODE : DarkModes.DARK_MODE;

  return (
    <Button className={classes.button} onClick={() => handleClick(mode)}>
      {Icon}
    </Button>
  );
};

export default DarkButton;
