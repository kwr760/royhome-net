// @flow

import React from 'react';
import { NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => (
  <footer className="p-3 text-center">
    <NavLink href="https://github.com/kwr760/royhome-net" alt="github" target="_target" data-testid="footer-logo">
      <FontAwesomeIcon icon={['fab', 'github']} className="fa-2x" />
    </NavLink>
  </footer>
);

export default Footer;
