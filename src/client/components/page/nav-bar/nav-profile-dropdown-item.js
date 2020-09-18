// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  DropdownItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {|
  path: string,
  name: string,
  icon: string,
|}

const NavProfileDropDownItem = ({ path, name, icon }: Props) => (
  <DropdownItem
    tag={RouterNavLink}
    to={path}
    activeClassName="router-link-exact-active"
  >
    <FontAwesomeIcon icon={icon} className="mr-3" />
    {name}
  </DropdownItem>
);

NavProfileDropDownItem.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default NavProfileDropDownItem;
