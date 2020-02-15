import React from 'react';
import PropTypes from 'prop-types';


const Home = () => (
  <div>
    <h1>This is the home page of Kevin Roy</h1>
  </div>
);

Home.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
  }).isRequired,
};

export default Home;
