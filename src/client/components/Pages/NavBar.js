import React, { useState } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Button,
} from 'reactstrap';

import { useAuth0 } from '../../../util/auth0/context';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isAuthenticated, loginWithRedirect, logout, userHasRole,
  } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="nav-container">
      <Navbar style={{ backgroundImage: 'linear-gradient(to bottom right, #1d3057, #828894)' }} expand="sm">
        <Container>
          <NavbarToggler data-testid="navbar-toggler" onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/resume"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  <FontAwesomeIcon icon="link" className="mr-3" />
                  Resume
                </NavLink>
              </NavItem>
              { isAuthenticated && (
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/profile"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  <FontAwesomeIcon icon="user" className="mr-3" />
                  Profile
                </NavLink>
              </NavItem>
              )}
              { isAuthenticated && (
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/private"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  Private
                </NavLink>
              </NavItem>
              )}
              { isAuthenticated && userHasRole('engineer') && (
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/courses"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  Courses
                </NavLink>
              </NavItem>
              )}
            </Nav>
            <Nav navbar>
              <NavItem>
                <Button type="submit" onClick={isAuthenticated ? () => logout() : () => loginWithRedirect()}>
                  <FontAwesomeIcon icon="power-off" className="mr-3" />
                  {isAuthenticated ? 'Log out' : 'Log in'}
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>

  );
};

export default NavBar;
