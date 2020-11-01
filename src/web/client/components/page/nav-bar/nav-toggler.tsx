import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { isAuthenticated } from '../../../store/session/session.selector';
import NavTogglerButton from './nav-toggler-button';
import NavTogglerMenu from './nav-toggler-menu';

const NavToggler: FunctionComponent = () => {
  const authenticated = useSelector(isAuthenticated);

  if (!authenticated) {
    return <NavTogglerButton />;
  }

  return <NavTogglerMenu />;
};

export default NavToggler;
