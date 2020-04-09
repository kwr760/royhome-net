// @flow

import React, { useState } from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { useAuth0 } from '../../../util/auth0/context';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    user, isAuthenticated, loginWithRedirect, logout, userHasRole,
  } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);

  const name = (user && user.name) || '';
  const picture = (user && user.picture) || '';

  return (
    <div className="nav-container">
      <Navbar light expand="md">
        <Container>
          <NavbarBrand className="logo" />
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
                  Resume
                </NavLink>
              </NavItem>
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
            <Nav className="d-none d-md-block" navbar>
              {!isAuthenticated && (
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="secondary"
                    className="btn-margin"
                    onClick={() => loginWithRedirect({})}
                  >
                    <FontAwesomeIcon icon="sign-in-alt" className="mr-3" />
                    Log in
                  </Button>
                </NavItem>
              )}
              {isAuthenticated && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>{name}</DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/profile"
                      className="dropdown-profile"
                      activeClassName="router-link-exact-active"
                    >
                      <FontAwesomeIcon icon="user-alt" className="mr-3" />
                      Profile
                    </DropdownItem>
                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logout()}
                    >
                      <FontAwesomeIcon icon="sign-out-alt" className="mr-3" />
                      Log out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            {!isAuthenticated && (
              <Nav className="d-md-none" navbar>
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="secondary"
                    onClick={() => loginWithRedirect({})}
                  >
                    <FontAwesomeIcon icon="sign-in-alt" className="mr-3" />
                    Log in
                  </Button>
                </NavItem>
              </Nav>
            )}
            {isAuthenticated && (
              <Nav
                className="d-md-none justify-content-between"
                navbar
              >
                <NavItem>
                  <span className="user-info">
                    <img
                      src={picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                    />
                    <h6 className="d-inline-block">{name}</h6>
                  </span>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="user-alt" className="mr-3" />
                  <RouterNavLink
                    to="/profile"
                    activeClassName="router-link-exact-active"
                  >
                    Profile
                  </RouterNavLink>
                </NavItem>
                <NavItem>
                  <FontAwesomeIcon icon="sign-out-alt" className="mr-3" />
                  <RouterNavLink
                    to="#"
                    id="qsLogoutBtn"
                    onClick={() => logout()}
                  >
                    Log out
                  </RouterNavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
