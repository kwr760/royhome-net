import React, { FunctionComponent } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  DropdownItem,
} from 'reactstrap';

interface Props {
  path: string;
  name: string;
  icon: unknown;
}

const NavProfileDropDownItem: FunctionComponent<Props> = ({ path, name, icon }) => (
  <DropdownItem
    tag={RouterNavLink}
    to={path}
    activeClassName="router-link-exact-active"
  >
    {icon}
    {name}
  </DropdownItem>
);

export default NavProfileDropDownItem;
