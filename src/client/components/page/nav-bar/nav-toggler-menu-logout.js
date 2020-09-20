// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import {
  NavItem,
} from 'reactstrap';

import { useAuth0 } from '@src/util/auth0/auth0-context';

type Props = {|
  name: string,
|}

const NavTogglerMenuLogout = ({ name }: Props) => {
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

NavTogglerMenuLogout.propTypes = {
  name: PropTypes.string.isRequired,
};

export default NavTogglerMenuLogout;
