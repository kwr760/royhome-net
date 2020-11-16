import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';

import {
  Avatar,
  Container,
  Tabs,
  Tab,
  IconButton,
  AppBar,
  Toolbar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  createStyles,
  useMediaQuery,
  useTheme,
  Theme, Typography, Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from 'react-redux';
import { useLocation , NavLink } from 'react-router-dom';
import hasNeededRole from '../../../../../common/util/auth0/has-needed-role';
import { useAuth0 } from '../../../../util/auth0/auth0-context';
import { isAuthenticated } from '../../../store/session/session.selector';
import { getUser } from '../../../store/user/user.selector';
import DarkButton from '../dark-button';

import logo from '../../../assets/images/browns-on-gray.png';
import { FiUser, FiLogIn, FiLogOut, FiEyeOff } from 'react-icons/fi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      display: 'flex',
      '& > *': {
        marginRight: theme.spacing(3),
      },
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    appbarColor: {
      background: 'linear-gradient(to bottom right, var(--color-banner-dark), var(--color-banner-light))',
      zIndex: 1,
    },
    grow: {
      flexGrow: 1,
    },
  }),
);

const useMenuStyles = makeStyles((theme: Theme) =>
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

const useMenu = (
  isMobile: boolean,
  isAuthenticated: boolean,
  anchorState: [null | HTMLElement, Dispatch<SetStateAction<null | HTMLElement>>],
) => {
  const classes = useMenuStyles();
  const [anchor, setAnchor] = anchorState;
  const handleMenuClose = () => { setAnchor(null); };
  const { login, logout } = useAuth0();
  const user = useSelector(getUser);
  const shouldDisplayTab = (checkRole: string) => {
    if (checkRole.length > 0) {
      if (!isAuthenticated || !hasNeededRole(checkRole, user.context)) {
        return false;
      }
    }
    return true;
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
      { isAuthenticated ? <Typography className={`${classes.profileName} my-3`}>Kevin Roy</Typography> : null }
      { isAuthenticated ? <Divider /> : null }
      { isMobile ?
        <MenuItem component={NavLink} to="/">
          <ListItemIcon /><ListItemText primary="Resume"/>
        </MenuItem> :
        null
      }
      { isMobile ?
        <MenuItem component={NavLink} to="/about">
          <ListItemIcon /><ListItemText primary="About"/>
        </MenuItem> :
        null
      }
      { isMobile ?
        <MenuItem component={NavLink} to="/author">
          <ListItemIcon /><ListItemText primary="Author"/>
        </MenuItem> :
        null
      }
      {
        isMobile && shouldDisplayTab('engineer') ?
          <MenuItem component={NavLink} to="/tictactoe">
            <ListItemIcon /><ListItemText primary="Work In Progress"/>
          </MenuItem> :
          null
      }

      { isAuthenticated ?
        <MenuItem component={NavLink} to="/profile">
          <ListItemIcon><FiUser /></ListItemIcon>
          <ListItemText primary="Profile"/>
        </MenuItem>
        : null
      }
      <MenuItem component={NavLink} to="/privacy">
        <ListItemIcon><FiEyeOff /></ListItemIcon>
        <ListItemText primary="Privacy"/>
      </MenuItem>
      <Divider />
      { isAuthenticated ?
        <MenuItem onClick={() => logout()}>
          <ListItemIcon><FiLogOut /></ListItemIcon>
          <ListItemText primary="Logout"/>
        </MenuItem> :
        <MenuItem onClick={() => login({})}>
          <ListItemIcon><FiLogIn /></ListItemIcon>
          <ListItemText primary="Login"/>
        </MenuItem>
      }
    </Menu>
  );
};

const NavBar: FunctionComponent = () => {
  const classes = useStyles();
  const location = useLocation();
  let initialTab = 0;
  switch (location.pathname) {
  case '/author':
    initialTab = 1;
    break;
  case '/about':
    initialTab = 2;
    break;
  case '/tictactoe':
    initialTab = 3;
    break;
  }
  const [value, setValue] = React.useState(initialTab);
  const anchorState = React.useState<null | HTMLElement>(null);
  const setAnchor = anchorState[1];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const authenticated = useSelector(isAuthenticated);
  const user = useSelector(getUser);
  const { picture: userPicture = '' } = user;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleChange = (_event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };

  const shouldDisplayTab = (checkRole: string) => {
    if (checkRole.length > 0) {
      if (!authenticated || !hasNeededRole(checkRole, user.context)) {
        return false;
      }
    }
    return true;
  };

  return (
    <Container className={'p-0'}>
      <div className={`${classes.grow}`}>
        <AppBar className={`${classes.appbarColor} nav-link`} position="static">
          <Toolbar>
            <div className={classes.image}>
              <Avatar alt="RoyHome" src={logo} className={classes.large}/>
            </div>
            {
              isMobile ? null :
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="app tab"
                >
                  <Tab component={NavLink} to="/" label="Resume" />
                  <Tab component={NavLink} to="/author" label="Author" />
                  <Tab component={NavLink} to="/about" label="About" />
                  {
                    shouldDisplayTab('engineer') ?
                      <Tab component={NavLink} to="/tictactoe" label="Work in Progress" /> :
                      null
                  }
                </Tabs>
            }
            <div className={classes.grow} />
            <DarkButton />
            <IconButton
              // edge="end"
              aria-label="show more"
              aria-controls='nav-bar-menu'
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              {
                authenticated ?
                  <Avatar alt="loginPicture" src={userPicture} className={classes.large}/> :
                  <MenuIcon fontSize="large" />
              }
            </IconButton>
          </Toolbar>
        </AppBar>
        {useMenu(isMobile, authenticated, anchorState)}
      </div>
    </Container>
  );
};

export default NavBar;
