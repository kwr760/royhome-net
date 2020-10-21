import React from 'react';
import { useSelector } from 'react-redux';
import {
  Nav,
} from 'reactstrap';

import { isAuthenticated } from '../../../store/session/session.selector';
import NavLogin from './nav-login';
import NavProfileDropDown from './nav-profile-dropdown';

const NavProfile = (): JSX.Element => {
  const authenticated = useSelector((state) => isAuthenticated(state));

  let NavComponent;
  if (authenticated) {
    NavComponent = NavProfileDropDown;
  } else {
    NavComponent = NavLogin;
  }

  return (
    <Nav className="d-none d-md-block" navbar>
      <NavComponent />
    </Nav>
  );
};

export default NavProfile;
