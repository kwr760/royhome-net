import React from 'react';
import spinner from '../../assets/loading.svg';

const Loading = () => (
  <div className="spinner">
    <img className="loading" src={spinner} alt="Loading" />
  </div>
);

Loading.propTypes = {
};

export default Loading;
