import React, { FunctionComponent } from 'react';
import { Link } from '@material-ui/core';
import { VscGithub } from 'react-icons/vsc';

const Footer: FunctionComponent = () => (
  <footer className="p-3 text-center">
    <Link
      href="https://github.com/kwr760/royhome-net"
      target="_target"
    >
      <VscGithub className="fa-2x" />
      <span className="sr-only">Link to github</span>
    </Link>
  </footer>
);

export default Footer;
