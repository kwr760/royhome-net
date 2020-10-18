import React, { FunctionComponent } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import {
  NavItem,
} from 'reactstrap';

import { useAuth0 } from '../../../../util/auth0/auth0-context';

interface Props {
  name: string;
}

const NavTogglerMenuLogout: FunctionComponent<Props> = ({ name }) => {
  const { logout } = useAuth0();
  return (
    <NavItem>
      <FiLogOut className="mr-3" />
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
