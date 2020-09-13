// @flow
import React from 'react';
import {
  Button,
  Nav,
  NavItem,
} from 'reactstrap';

import { useAuth0 } from '@src/util/auth0/auth0-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavTogglerButton = () => {
  const { login } = useAuth0();

  return (
    <Nav className="d-md-none" navbar>
      <NavItem>
        <Button
          id="LoginButtonDropdown"
          color="secondary"
          onClick={() => login()}
        >
          <FontAwesomeIcon icon="sign-in-alt" className="mr-3" />
          Log in
        </Button>
      </NavItem>
    </Nav>
  );
};

export default NavTogglerButton;
