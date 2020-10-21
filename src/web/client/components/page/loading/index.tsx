import React from 'react';
import spinner from '../../../assets/loading.svg';

const Loading = (): JSX.Element => (
  <div className="spinner">
    <img className="loading" src={spinner} alt="Loading" />
  </div>
);

export default Loading;
