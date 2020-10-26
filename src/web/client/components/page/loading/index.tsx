import React, { FunctionComponent } from 'react';
import spinner from '../../../assets/loading.svg';

const Loading: FunctionComponent = () => (
  <div className="spinner">
    <img className="loading" src={spinner} alt="Loading" />
  </div>
);

export default Loading;
