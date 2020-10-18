import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  DropdownItem,
} from 'reactstrap';

interface Props {
  path: string;
  name: string;
  icon: unknown;
}

const NavProfileDropDownItem = ({ path, name, icon }: Props): JSX.Element => (
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
