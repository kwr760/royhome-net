// @flow
import React from 'react';
import { useSelector } from 'react-redux';
import {
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
} from 'reactstrap';

import { getUser } from '../../../store/user/user.selector';
import NavProfileDropDownItem from './nav-profile-dropdown-item';
import NavProfileDropDownLogout from './nav-profile-dropdown-logout';
import NavProfileDropDownToggle from './nav-profile-dropdown-toggle';

const NavProfileDropDown = () => {
  const user = useSelector((state) => getUser(state, null));

  const name = (user && user.name) || '';

  return (
    <UncontrolledDropdown nav inNavbar>
      <NavProfileDropDownToggle name="Profile" />
      <DropdownMenu>
        <DropdownItem header>{name}</DropdownItem>
        <NavProfileDropDownItem path="/profile" name="Profile" icon="user-alt" />
        <NavProfileDropDownItem path="/privacy" name="Privacy" icon="user-secret" />
        <NavProfileDropDownLogout name="Log out" icon="sign-out-alt" />
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default NavProfileDropDown;
