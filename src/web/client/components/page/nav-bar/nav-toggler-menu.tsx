import React, { FunctionComponent } from 'react';
import { Nav } from 'reactstrap';
import { FiUser } from 'react-icons/fi';
import { VscGistSecret } from 'react-icons/vsc';

import NavTogglerMenuItem from './nav-toggler-menu-item';
import NavTogglerMenuLogout from './nav-toggler-menu-logout';

const NavTogglerMenu: FunctionComponent = () => {
  const UserIcon = <FiUser className="mr-3" />;
  const PrivacyIcon = <VscGistSecret className="mr-3" />;
  return (
    <Nav
      className="d-md-none justify-content-between"
      navbar
    >
      <NavTogglerMenuItem path="/profile" name="Profile" icon={UserIcon} />
      <NavTogglerMenuItem path="/privacy" name="Privacy" icon={PrivacyIcon} />
      <NavTogglerMenuLogout name="Log out" />
    </Nav>
  );
};

export default NavTogglerMenu;
