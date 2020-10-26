import React, { FunctionComponent } from 'react';
import { NavLink } from 'reactstrap';
import { VscGithub } from 'react-icons/vsc';

const Footer: FunctionComponent = () => (
  <footer className="p-3 text-center">
    <NavLink
      href="https://github.com/kwr760/royhome-net"
      alt="github"
      target="_target"
      data-testid="footer-logo"
    >
      <VscGithub className="fa-2x" />
      <span className="sr-only">Link to github</span>
    </NavLink>
  </footer>
);

export default Footer;
