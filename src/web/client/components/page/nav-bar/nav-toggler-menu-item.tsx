import React, { FunctionComponent } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  NavItem,
} from 'reactstrap';

interface Props {
  path: string;
  name: string;
  icon: unknown;
}

const NavTogglerMenuItem: FunctionComponent<Props> = ({ path, name, icon }) => (
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

export default NavTogglerMenuItem;
