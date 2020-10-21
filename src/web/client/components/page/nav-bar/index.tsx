import React, { useState } from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
} from 'reactstrap';

import NavTabs from './nav-tabs';
import NavProfile from './nav-profile';
import NavToggler from './nav-toggler';
import DarkButton from '../dark-button';

const NavBar = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="nav-container">
      <Navbar light expand="md">
        <Container>
          <NavbarBrand className="logo" />
          <NavbarToggler data-testid="navbar-toggler" onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <NavTabs />
            <DarkButton />
            <NavProfile />
            <NavToggler />
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
