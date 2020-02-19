import React from 'react';
import PropTypes from 'prop-types';
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

Home.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
  }).isRequired,
};

export default Home;
