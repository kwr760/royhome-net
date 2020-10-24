import React, { FunctionComponent } from 'react';
import {
  Nav,
} from 'reactstrap';

import NavTabItem from './nav-tab-item';

const NavTabs: FunctionComponent = () => (
  <Nav className="mr-auto" navbar>
    <NavTabItem path="/" name="Resume" />
    <NavTabItem path="/about" name="About" />
    <NavTabItem path="/author" name="Author" />
    <NavTabItem path="/tictactoe" name="Work In Progress" neededRole="engineer" />
  </Nav>
);

export default NavTabs;
