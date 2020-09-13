// @flow
import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  NavItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAuth0 } from '@src/util/auth0/auth0-context';

type Props = {|
  name: string,
  icon: string,
|}

const NavTogglerMenuLogout = ({ name, icon }: Props) => {
  const { logout } = useAuth0();
  return (
    <NavItem>
      <FontAwesomeIcon icon={icon} className="mr-3" />
      <RouterNavLink
        to="#"
        id="qsLogoutBtn"
        onClick={() => logout()}
      >
        {name}
      </RouterNavLink>
    </NavItem>
  );
};

export default NavTogglerMenuLogout;
