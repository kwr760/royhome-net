import { Avatar, createStyles, IconButton, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { isAuthenticated } from '../../../store/session/session.selector';
import { getUser } from '../../../store/user/user.selector';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }),
);

interface Props {
  setAnchor:Dispatch<SetStateAction<null | HTMLElement>>;
}

export const NavBarMenuButton: FunctionComponent<Props> = ({ setAnchor }) => {
  const classes = useStyles();
  const authenticated = useSelector(isAuthenticated);
  const user = useSelector(getUser);
  const { picture: userPicture = '' } = user;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  return <IconButton
    aria-label="menu"
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
  </IconButton>;
};
