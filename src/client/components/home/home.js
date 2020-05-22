// @flow

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => (
  <div>
    <h1>This is the home page of Kevin Roy</h1>
    <p>
      A pretty icon for github.
      <FontAwesomeIcon icon={['fab', 'github']} className="fa-2x" />
    </p>
  </div>
);

export default Home;
