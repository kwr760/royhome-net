import { createStyles, Tab, Tabs, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { isAuthenticated } from '../../../store/session/session.selector';
import { getUser } from '../../../store/user/user.selector';
import { displayPage } from './display-page';
import { pages } from './pages';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tab: {
      color: theme.palette.secondary.main,
    },
  }),
);

interface Props {
  position: number;
  setPosition: Dispatch<SetStateAction<number>>;
}
export const NavBarTabs: FunctionComponent<Props> = ({ position, setPosition }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const authenticated = useSelector(isAuthenticated);
  const user = useSelector(getUser);

  const handleChange = (_event: React.ChangeEvent<unknown>, newValue: number) => {
    setPosition(newValue);
  };

  if (isMobile) {
    return null;
  }

  return (
    <Tabs
      value={position}
      onChange={handleChange}
      aria-label="tabs"
    >
      {
        pages.filter(displayPage(authenticated, user)).map((page) => {
          return <Tab component={NavLink} key={page.path} to={page.path} label={page.name} className={classes.tab} />;
        })
      }
    </Tabs>
  );
};
