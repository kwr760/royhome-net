// @flow
import React from 'react';
import {
  Button,
  NavItem,
} from 'reactstrap';

import { useAuth0 } from '@src/util/auth0/auth0-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavLogin = () => {
  const { login } = useAuth0();

  return (
    <NavItem>
      <Button
        id="LoginButton"
        color="secondary"
        className="btn-margin border-0"
        onClick={() => login()}
      >
        <FontAwesomeIcon icon="sign-in-alt" className="mr-3" />
        Log in
      </Button>
    </NavItem>
  );
};

export default NavLogin;
