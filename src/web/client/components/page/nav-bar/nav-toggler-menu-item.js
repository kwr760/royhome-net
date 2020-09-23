// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  NavItem,
} from 'reactstrap';

type Props = {|
  path: string,
  name: string,
  icon: any,
|}

const NavTogglerMenuItem = ({ path, name, icon }: Props) => (
  <NavItem>
    {icon}
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
  icon: PropTypes.element.isRequired,
};

export default NavTogglerMenuItem;
