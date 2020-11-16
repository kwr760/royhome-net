import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';

interface Props {
  path: string;
  name: string;
  icon: unknown;
}

const NavTogglerMenuItem: FunctionComponent<Props> = ({ path, name, icon }) => (
  <NavItem>
    {icon}
    <NavLink
      to={path}
      activeClassName="router-link-exact-active"
    >
      {name}
    </NavLink>
  </NavItem>
);

export default NavTogglerMenuItem;
