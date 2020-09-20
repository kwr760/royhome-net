// @flow
import React from 'react';
import { useSelector } from 'react-redux';

import { isAuthenticated } from '../../../store/session/session.selector';
import NavTogglerButton from './nav-toggler-button';
import NavTogglerMenu from './nav-toggler-menu';

const NavToggler = () => {
  const authenticated = useSelector((state) => isAuthenticated(state, null));

  let Toggler;
  if (!authenticated) {
    Toggler = NavTogglerButton;
  } else {
    Toggler = NavTogglerMenu;
  }

  return (<Toggler />);
};

export default NavToggler;
