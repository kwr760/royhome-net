import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import {
  NavItem,
  // NavLink,
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
      <NavLink
        to="#"
        id="qsLogoutBtn"
        onClick={() => logout()}
      >
        {name}
      </NavLink>
    </NavItem>
  );
};

export default NavTogglerMenuLogout;
