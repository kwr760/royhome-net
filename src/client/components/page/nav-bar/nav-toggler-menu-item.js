// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  NavItem,
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {|
  path: string,
  name: string,
  icon: string,
|}

const NavTogglerMenuItem = ({ path, name, icon }: Props) => (
  <NavItem>
    <FontAwesomeIcon icon={icon} className="mr-3" />
    <RouterNavLink
      to={path}
      activeClassName="router-link-exact-active"
    >
      {name}
    </RouterNavLink>
  </NavItem>
);

NavTogglerMenuItem.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default NavTogglerMenuItem;
