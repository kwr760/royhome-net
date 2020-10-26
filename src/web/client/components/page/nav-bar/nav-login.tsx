import React, { FunctionComponent } from 'react';
import {
  Button,
  NavItem,
} from 'reactstrap';
import { FiLogIn } from 'react-icons/fi';

import { useAuth0 } from '../../../../util/auth0/auth0-context';

const NavLogin: FunctionComponent = () => {
  const { login } = useAuth0();

  return (
    <NavItem>
      <Button
        id="LoginButton"
        color="secondary"
        className="btn-margin border-0"
        onClick={() => login()}
      >
        <FiLogIn className="mr-3" />
        Log in
      </Button>
    </NavItem>
  );
};

export default NavLogin;
