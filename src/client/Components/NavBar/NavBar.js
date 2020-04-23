// @flow

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
import { isAuthenticated } from '../../store/session/session.selector';
import { getUser } from '../../store/user/user.selector';
import hasNeededRole from '../../../util/auth0/has-needed-role';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { login, logout } = useAuth0();
  const toggle = () => setIsOpen(!isOpen);
  const authenticated = useSelector((state) => isAuthenticated(state, null));
  const user = useSelector((state) => getUser(state, null));

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
                  to="/staticresume"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  Resume
                </NavLink>
              </NavItem>
              { authenticated && hasNeededRole('engineer', user.context) && (
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="/resume"
                    exact
                    activeClassName="router-link-exact-active"
                  >
                   The New Resume
                  </NavLink>
                </NavItem>
              )}
            </Nav>
            <Nav className="d-none d-md-block" navbar>
              {!authenticated && (
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="secondary"
                    className="btn-margin"
                    onClick={() => login()}
                  >
                    <FontAwesomeIcon icon="sign-in-alt" className="mr-3" />
                    Log in
                  </Button>
                </NavItem>
              )}
              {authenticated && (
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
            {!authenticated && (
              <Nav className="d-md-none" navbar>
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="secondary"
                    onClick={() => login()}
                  >
                    <FontAwesomeIcon icon="sign-in-alt" className="mr-3" />
                    Log in
                  </Button>
                </NavItem>
              </Nav>
            )}
            {authenticated && (
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
