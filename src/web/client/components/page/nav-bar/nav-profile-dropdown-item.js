// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  DropdownItem,
} from 'reactstrap';

type Props = {|
  path: string,
  name: string,
  icon: any,
|}

const NavProfileDropDownItem = ({ path, name, icon }: Props) => (
  <DropdownItem
    tag={RouterNavLink}
    to={path}
    activeClassName="router-link-exact-active"
  >
    {icon}
    {name}
  </DropdownItem>
);

NavProfileDropDownItem.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default NavProfileDropDownItem;
