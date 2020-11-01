import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
  NavItem,
  NavLink,
} from 'reactstrap';

import hasNeededRole from '../../../../../common/util/auth0/has-needed-role';
import { isAuthenticated } from '../../../store/session/session.selector';
import { getUser } from '../../../store/user/user.selector';

interface Props {
  path: string;
  name: string;
  neededRole?: string;
}

const NavTabItem: FunctionComponent<Props> = ({ path, name, neededRole = '' }) => {
  const authenticated = useSelector(isAuthenticated);
  const user = useSelector(getUser);
  const shouldDisplayTab = (checkRole: string) => {
    if (checkRole.length > 0) {
      if (!authenticated || !hasNeededRole(checkRole, user.context)) {
        return false;
      }
    }
    return true;
  };

  if (!shouldDisplayTab(neededRole)) {
    return null;
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

export default NavTabItem;
