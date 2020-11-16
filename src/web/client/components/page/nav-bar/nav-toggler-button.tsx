import React, { FunctionComponent } from 'react';
import { Button, Nav, NavItem } from 'reactstrap';
import { FiLogIn } from 'react-icons/fi';

import { useAuth0 } from '../../../../util/auth0/auth0-context';

const NavTogglerButton: FunctionComponent = () => {
  const { login } = useAuth0();

  return (
    <Nav className="d-md-none" navbar>
      <NavItem>
        <Button
          id="LoginButtonDropdown"
          color="secondary"
          onClick={() => login({})}
        >
          <FiLogIn className="mr-3" />
          Log in
        </Button>
      </NavItem>
    </Nav>
  );
};

export default NavTogglerButton;
