import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  createStyles, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Theme, Typography, useMediaQuery, useTheme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FiEyeOff, FiLogIn, FiLogOut, FiUser } from 'react-icons/fi';

import { useAuth0 } from '../../../../util/auth0/auth0-context';
import { isAuthenticated } from '../../../store/session/session.selector';
import { getUser } from '../../../store/user/user.selector';
import { displayPage } from './display-page';
import { pages } from './pages';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      background: '#fff2e4',
      color: '#000',
      border: '1px solid #000',
    },
    list: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    profileName: {
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
  }),
);

interface Props {
  anchor: null | HTMLElement;
  setAnchor: Dispatch<SetStateAction<null | HTMLElement>>;
}
export const NavBarMenu: FunctionComponent<Props> = ( { anchor, setAnchor }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const authenticated = useSelector(isAuthenticated);
  const handleMenuClose = () => { setAnchor(null); };
  const { login, logout } = useAuth0();
  const user = useSelector(getUser);
  const onLogin = () => {
    login({});
    handleMenuClose();
  };
  const onLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <Menu
      anchorEl={anchor}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      id='nav-bar-menu'
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={Boolean(anchor)}
      onClose={handleMenuClose}
      classes={{ list: classes.list, paper: classes.paper }}
    >
      { authenticated ? <Typography className={`${classes.profileName} my-3`}>Kevin Roy</Typography> : null }
      { authenticated ? <Divider /> : null }
      { isMobile ?
        pages.filter(displayPage(authenticated, user)).map((page) => {
          return (
            <MenuItem component={NavLink} key={page.path} to={page.path}>
              <ListItemIcon /><ListItemText primary={page.name} />
            </MenuItem>
          );
        }) :
        null }
      { isMobile ? <Divider /> : null }
      { authenticated ? (
        <MenuItem component={NavLink} to="/profile">
          <ListItemIcon><FiUser /></ListItemIcon>
          <ListItemText primary="Profile"/>
        </MenuItem>
      ) : null }
      <MenuItem component={NavLink} to="/privacy">
        <ListItemIcon><FiEyeOff /></ListItemIcon>
        <ListItemText primary="Privacy"/>
      </MenuItem>
      <Divider />
      { authenticated ? (
        <MenuItem onClick={onLogout}>
          <ListItemIcon><FiLogOut /></ListItemIcon>
          <ListItemText primary="Logout"/>
        </MenuItem>
      ) : (
        <MenuItem onClick={onLogin}>
          <ListItemIcon><FiLogIn /></ListItemIcon>
          <ListItemText primary="Login"/>
        </MenuItem>
      )}
    </Menu>
  );
};
