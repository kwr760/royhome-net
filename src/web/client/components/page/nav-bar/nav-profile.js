// @flow
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Nav,
} from 'reactstrap';

import { isAuthenticated } from '../../../store/session/session.selector';
import NavLogin from './nav-login';
import NavProfileDropDown from './nav-profile-dropdown';

const NavProfile = () => {
  const authenticated = useSelector((state) => isAuthenticated(state, null));

  let NavComponenet;
  if (authenticated) {
    NavComponenet = NavProfileDropDown;
  } else {
    NavComponenet = NavLogin;
  }

  return (
    <Nav className="d-none d-md-block" navbar>
      <NavComponenet />
    </Nav>
  );
};

export default NavProfile;
