import React, { FunctionComponent } from 'react';
import { Container, Link } from '@material-ui/core';
import { VscGithub } from 'react-icons/vsc';

const Footer: FunctionComponent = () => (
  <Container className={`p-0`}>
    <footer className="p-3 text-center">
      <Link
        href="https://github.com/kwr760/royhome-net"
        target="_target"
        className="nav-link"
      >
        <VscGithub className="fa-2x" />
        <span className="sr-only">Link to github</span>
      </Link>
    </footer>
  </Container>
);

export default Footer;
