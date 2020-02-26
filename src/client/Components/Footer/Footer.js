import React from 'react';
import { NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => (
  <footer style={{ backgroundImage: 'linear-gradient(to bottom right, #1d3057, #828894)' }} className="p-3 text-center">
    <NavLink href="https://github.com/kwr760/royhome-net" target="_target" data-testid="footer-logo">
      <FontAwesomeIcon icon={['fab', 'github']} className="fa-2x" />
    </NavLink>
  </footer>
);

Footer.propTypes = {
};

export default Footer;
