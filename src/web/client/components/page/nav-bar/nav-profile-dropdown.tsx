import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import {
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
} from 'reactstrap';
import { FiUser } from 'react-icons/fi';
import { VscGistSecret } from 'react-icons/vsc';

import { getUser } from '../../../store/user/user.selector';
import NavProfileDropDownItem from './nav-profile-dropdown-item';
import NavProfileDropDownLogout from './nav-profile-dropdown-logout';
import NavProfileDropDownToggle from './nav-profile-dropdown-toggle';

const NavProfileDropDown: FunctionComponent = () => {
  const user = useSelector(getUser);
  const name = (user && user.name) || '';
  const UserIcon = <FiUser className="mr-3" />;
  const PrivacyIcon = <VscGistSecret className="mr-3" />;

  return (
    <UncontrolledDropdown nav inNavbar>
      <NavProfileDropDownToggle name="Profile" />
      <DropdownMenu>
        <DropdownItem header>{name}</DropdownItem>
        <NavProfileDropDownItem path="/profile" name="Profile" icon={UserIcon} />
        <NavProfileDropDownItem path="/privacy" name="Privacy" icon={PrivacyIcon} />
        <NavProfileDropDownLogout name="Log out" />
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default NavProfileDropDown;
