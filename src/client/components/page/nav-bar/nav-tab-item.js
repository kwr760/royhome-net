// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  NavItem,
  NavLink,
} from 'reactstrap';

import hasNeededRole from '@src/util/auth0/has-needed-role';
import { isAuthenticated } from '../../../store/session/session.selector';
import { getUser } from '../../../store/user/user.selector';

type Props = {|
  path: string,
  name: string,
  // eslint-disable-next-line react/require-default-props
  neededRole?: string,
|}

const NavTabItem = ({ path, name, neededRole = ''}: Props) => {
  const authenticated = useSelector((state) => isAuthenticated(state, null));
  const user = useSelector((state) => getUser(state, null));
  const shouldDisplayTab = (checkRole: string) => {
    if (checkRole.length > 0) {
      if (!authenticated || !hasNeededRole(checkRole, user.context)) {
        return false;
      }
    }
    return true;
  };

  if (!shouldDisplayTab(neededRole)) {
    return '';
  }

  return (
    <NavItem>
      <NavLink
        tag={RouterNavLink}
        to={path}
        exact
        activeClassName="router-link-exact-active"
      >
        {name}
      </NavLink>
    </NavItem>
  );
};

NavTabItem.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  neededRole: PropTypes.string,
};

export default NavTabItem;
