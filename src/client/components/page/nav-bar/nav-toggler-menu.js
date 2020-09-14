// @flow
import React from 'react';
import {
  Nav,
} from 'reactstrap';

import NavTogglerMenuItem from './nav-toggler-menu-item';
import NavTogglerMenuLogout from './nav-toggler-menu-logout';

const NavTogglerMenu = () => (
  <Nav
    className="d-md-none justify-content-between"
    navbar
  >
    <NavTogglerMenuItem path="/profile" name="Profile" icon="user-alt" />
    <NavTogglerMenuItem path="/privacy" name="Privacy" icon="user-secret" />
    <NavTogglerMenuLogout name="Log out" icon="sign-out-alt" />
  </Nav>
);

export default NavTogglerMenu;
